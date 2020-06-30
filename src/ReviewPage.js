import React from 'react';
import * as actions from './redux/actionCreators';
import logo from './logo.svg';
import './style/frame.css'
import { getAllTime, toMmSs } from './script/foos'
import { FeedExReview } from './components/feedex'



export class ReviewPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        const store = this.context;

        this.state = {
            workout: store.getState().workouts.filter(item => item.id == store.getState().screen.id)[0]
        }

    }

    componentDidMount() {
        const root = document.querySelector('.main-feed');
        const header = document.querySelector('header');
        const footer = document.querySelector('.btn-footer');
        root.style.paddingTop = (Number(window.getComputedStyle(header).height.replace('px', '')) + 10) + 'px';

        root.style.paddingBottom = window.getComputedStyle(footer).height;
    }

    handleInputChange(e, inputName) {
        this.setState({
            workout: Object.assign({}, this.state.workout, { [inputName]: e.target.value })
        })
    }

    addEx(name) {
        this.setState({
            workout: Object.assign({}, this.state.workout, { exs: this.state.workout.exs.concat([name]) })
        })
    }

    render() {
        const store = this.context;
        return (
            <div>
                <header className="config-header">
                    <div>
                        <div className='btn-back' onClick={() => store.dispatch(actions.openMain())}>
                            <i className="material-icons">keyboard_arrow_left</i>
                        </div>
                        <div className='btn-back edit' onClick={() => store.dispatch(actions.openFrame(store.getState().screen.id))}>
                            <i className="material-icons">settings</i>
                        </div>
                    </div>

                    <div className='cfg-name'>
                        <div >
                            {this.state.workout.name}

                        </div>
                    </div>
                    <div className='cfg-category'>
                        <div>
                            {this.state.workout.category}
                        </div>
                    </div>
                    <div className='cfg-footer-box review'>
                        <div>
                            <i className="material-icons">access_time</i>&nbsp;
                               <span>{Math.round(getAllTime(this.state.workout) / 60)} min</span>
                        </div>
                        <div>
                            <i className="material-icons">fitness_center</i>&nbsp;
                            <span>{this.state.workout.exs.length} ex</span>
                        </div>
                        <div>
                            <i className="material-icons">replay</i>&nbsp;
                            <span>{this.state.workout.exs.length * this.state.workout.rounds * this.state.workout.sets} sets</span>
                        </div>
                    </div>
                    {/* <CfgSetBox workout={this.state.workout} openSettingsCfg={() => { this.setState({ openSettingCfg: true }) }} /> */}
                </header>
                <div className="main-feed vh">
                    <div className='feed-wrapper'>
                        <div className='rounds-box'>
                            <div>
                                <span>
                                    {this.state.workout.rounds}
                                </span>
                            </div>
                            <div>
                                <span>
                                    {/* &nbsp;Rounds */}
                                    Rounds
                                </span>
                            </div>
                        </div>
                        <div className='feed-box'>
                            <div className='round-line-box'>
                                <div className='round-line'></div>
                            </div>
                            <div className='feed-items-box'>
                                <div className='roundrest-box'>
                                    Warm up: {toMmSs(this.state.workout.warmUp)}
                                </div>
                                <FeedExReview config={this.state.workout} />
                                <div className='roundrest-box'>
                                    Rounds rest time: {toMmSs(this.state.workout.roundRestTime)}
                                </div>
                            </div>

                        </div>
                        <div>
                            <i className="material-icons">replay</i>
                        </div>

                    </div>
                </div>
                {/* <div className="App">
                    <div className='feed-wrapper'>
                        <br></br>
                        <div className='rounds-box'>
                            <span className='rounds-input'>
                                {this.state.workout.rounds}
                            </span>
                    &nbsp;&nbsp;ROUNDS
                    </div>
                        <div className='feed-box'>
                            <div className='round-line-box'>
                                <div className='round-line'></div>
                            </div>
                            <div className='feed-items-box'>
                                <Feed config={this.state.workout} />
                                <div className='roundrest-box'>
                                    REST BETWEEN ROUNDS {this.state.workout.roundRestTime}
                                </div>
                            </div>

                        </div>
                    </div>
                </div> */}
                {/* <div className='button-footer'>
                    <button onClick={() => {
                        store.dispatch(actions.openTimer(this.state.workout.id))
                    }}>START</button>
                </div> */}
                <div className='btn-footer'>

                    <div className='btn' onClick={() => {
                        store.dispatch(actions.openTimer(this.state.workout.id))
                    }}>START</div>
                </div>
            </div>
        )
    }
}


function Feed(props) {

    const exs = props.config.exs;

    return (
        exs.map((item, id) => {
            if (id !== exs.length - 1) {
                return (<div key={id} >
                    <div className='ex-card'>
                        {item}
                        <div className='ex-card-config'>
                            <div>sets: {props.config.sets}</div>
                            <div>time on: {props.config.timeOn}</div>
                            <div>time off: {props.config.timeOff}</div>
                        </div>
                    </div>
                    <div className='resttime-box'>
                        REST: {props.config.exRestTime}
                    </div>
                </div>)
            } else {
                return (
                    <div key={id} >
                        <div className='ex-card'>
                            {item}
                            <div className='ex-card-config'>
                                <div>sets: {props.config.sets}</div>
                                <div>work: {props.config.timeOn}</div>
                                <div>rest: {props.config.timeOff}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        }))
}




