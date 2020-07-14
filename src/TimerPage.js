import React from 'react';
import './style/timer.css'
import { Timer } from './timer'
import * as actions from './redux/actionCreators';
import { toMmSs } from './script/foos'
import { SetIndicator, RoundIndicator, ExIndicator } from './components/setindicator'
import { CurrentNextEx } from './components/curnextex'
import beepMid from './img/sounds/beep_mid.mp3'
import beepHeigh from './img/sounds/beep_heigh.mp3'
import beepLow from './img/sounds/beep_low.mp3'
import finBeep from './img/sounds/finish.mp3'


export class TimerPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            frame: [],
            exFrame: [],
            config: this.context.getState().workouts[this.context.getState().screen.id],
            timeRemain: this.context.getState().workouts[this.context.getState().screen.id].warmUp,
            round: this.context.getState().workouts[this.context.getState().screen.id].rounds,
            indicators: {
                round: 0,
                ex: 0,
                exName: this.context.getState().workouts[this.context.getState().screen.id].exs[0],
                set: 0,
                status: 'warmUp'
            },
            status: 'stop',
        }
        this.timer = new Timer(this.state.config, (e) => this.setState(e))
        this.status = 'warmUp'
        this.currentElementId = 0
    }

    componentDidMount() {
        this.timer.setPresets();
        const root = document.querySelector('.timer-wrapper');
        const header = document.querySelector('header');
        const footer = document.querySelector('.timer-footer');
        root.style.paddingTop = (Number(window.getComputedStyle(header).height.replace('px', '')) + 10) + 'px';
        root.style.paddingBottom = (Number(window.getComputedStyle(footer).height.replace('px', '')) + 20) + 'px';
    }

    componentDidUpdate(x, prevState) {
        console.log(this.state.indicators.status + ' ' + String(this.state.status))
        if (!!String(this.state.timeRemain).match(/(^3$|^2$|^1$)/) && this.state.timeRemain + 1 === prevState.timeRemain) {
            let audio = new Audio(beepMid);
            audio.play();
        }
        if (this.state.timeRemain === 0 && !!String(this.state.indicators.status).match(/(warmUp|timeOff|exRestTime|roundRestTime)/) && this.state.allTime !== 0) {
            let audio = new Audio(beepHeigh);
            audio.play();
        }
        if (this.state.timeRemain === 0 && !!String(this.state.indicators.status).match(/(timeOn)/) && this.state.allTime !== 0) {
            let audio = new Audio(beepLow);
            audio.play();
        }
        if (this.state.allTime === 0 && this.state.allTime + 1 === prevState.allTime) {
            this.currentElementId++;
            let audio = new Audio(finBeep);
            audio.play();
            this.forceUpdate();
        }

    }

    render() {

        if (this.state.indicators.status !== this.status) {
            this.currentElementId++
            this.status = this.state.indicators.status
        }

        const tickStyle = (this.state.status === 'start') ?
            {
                color: 'whitesmoke',
                borderColor: 'whitesmoke'
            } :
            {
                color: '#303239',
                borderColor: '#303239'
            }

        const StartPause = () => {
            if (this.state.allTime === 0) {
                return (
                    <div className='btn-start' onClick={() => {
                    }}>
                        <i className="material-icons">play_arrow</i>
                    </div>

                )
            }

            if (this.state.status === 'pause' || this.state.status === 'stop') {
                return (
                    <div className='btn-start' onClick={() => {
                        this.timer.start();
                    }}>
                        <i className="material-icons">play_arrow</i>
                    </div>

                )
            } else {
                return (
                    <div>
                        <div className='btn-pause' onClick={() => {
                            this.timer.stop();
                        }}>
                            <i className="material-icons">pause</i>
                        </div>
                    </div>
                )
            }
        }

        const divStyle = (this.state.indicators.status === 'timeOn') ?
            {
                backgroundColor: '#ffab2e',
            } :
            {
                backgroundColor: 'rgb(115, 184, 255)',
            }

        const context = this.context;
        return (
            <div className='timer-page-box'>
                {this.sound}
                <header className="timer-header">
                    <div className='btn-back'
                        onClick={() => {
                            this.timer.reset();
                            context.dispatch(actions.openReview(context.getState().screen.id))
                        }}>
                        <i className="material-icons">keyboard_arrow_left</i>
                    </div>
                    <div>
                        {this.state.config.name}
                    </div>
                </header>
                <div className='timer-wrapper' style={divStyle}>
                    <div className='timer-box' style={divStyle}>
                        <div className='tick-box' style={tickStyle}>
                            <div>
                                {toMmSs(this.state.timeRemain)}
                            </div>
                            <div className='timer-total'>
                                <i className="material-icons">timer</i>{toMmSs(this.state.allTime)}
                            </div>
                        </div>
                        <div>
                            <SetIndicator sets={this.state.config.sets} currentSet={this.state.indicators.set} />
                            <ExIndicator exs={this.state.config.exs.length} currentEx={this.state.indicators.ex} />
                            <RoundIndicator rounds={this.state.config.rounds} currentRound={this.state.indicators.round} />
                        </div>
                        <div className='next-box'>
                            <CurrentNextEx frame={this.state.exFrame} currentElementId={this.currentElementId} />
                        </div>
                    </div>
                </div>

                <div className='timer-footer'>
                    <StartPause />
                    <div className='btn-stop' onClick={() => {
                        this.status = 'stop'
                        this.currentElementId = -1
                        this.timer.reset();
                    }}>
                        <i className="material-icons">stop</i>
                    </div>
                </div>
            </div>
        )
    }
}



