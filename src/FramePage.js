import React from 'react';
import * as actions from './redux/actionCreators';
import './style/frame.css'
import { Context } from './index'
import { CfgSetBox } from './components/cfgsetbox'
import { SettingsCfg } from './components/settingscfg'
import { FeedExItem } from './components/feedex'
import { getAllTime, toMmSs, mobileCheck } from './script/foos'

export class FramePage extends React.Component {

    constructor(props, context) {

        super(props, context);
        this.state = {
            workout: {
                name: 'Workout name',
                category: 'Category',
                rounds: 4,
                warmUp: 30,
                sets: 5,
                timeOn: 30,
                timeOff: 15,
                exRestTime: 30,
                roundRestTime: 45,
                exs: ['Exercise 1', 'Exercise 2'],
                img: 0
            },
            openNameCfg: false,
            openSettingCfg: false,
            hideFooter: false
        }

        if (this.context.getState().screen.id !== null) {
            this.state = {
                workout: this.context.getState().workouts.filter(item => item.id === this.context.getState().screen.id)[0]
            }
        };

    }

    componentDidMount() {
        const root = document.querySelector('.main-feed');
        const header = document.querySelector('header');
        const footer = document.querySelector('.btn-footer');
        root.style.paddingTop = (Number(window.getComputedStyle(header).height.replace('px', '')) + 10) + 'px';
        root.style.paddingBottom = window.getComputedStyle(footer).height;
    }

    componentDidUpdate(props, prevState) {
        if (this.state.workout.exs.length !== prevState.workout.exs.length) {
            window.scrollTo({ left: 0, top: window.document.body.scrollHeight, behavior: "smooth" });
        }
    }


    handleInputChange(e, inputName) {
        this.setState({
            workout: Object.assign({}, this.state.workout, { [inputName]: e.target.value })
        })
        this.setState({
            workout: Object.assign({}, this.state.workout, { [inputName]: e.target.value })
        })
    }

    setCfg(obj) {
        this.setState({
            workout: Object.assign({}, this.state.workout, obj)
        })
        this.setState({
            openNameCfg: false
        })
        this.setState({
            openSettingCfg: false
        })

    }

    addEx(name) {
        name = name.replace(/^./, name[0].toUpperCase());
        this.setState({
            workout: Object.assign({}, this.state.workout, { exs: this.state.workout.exs.concat([name]) })
        })
        this.scroll();
    }
    removeEx(id) {
        let newExs = this.state.workout.exs.concat([]);
        newExs.splice(id, 1);
        this.setState({
            workout: Object.assign({}, this.state.workout, { exs: newExs })
        })
    }
    changeExName(id, value) {
        let newExs = this.state.workout.exs.concat([]);
        if (value.length !== 0) value = value.replace(/^./, value[0].toUpperCase());
        newExs[id] = value;
        this.setState({
            workout: Object.assign({}, this.state.workout, { exs: newExs })
        })
    }

    scroll() {
        // window.scrollTo({ left: 0, top: window.document.body.scrollHeight + 500, behavior: "smooth" });

    }

    render() {
        const store = this.context;
        SaveBtn.contextType = Context;
        const exs = this.state.workout.exs;

        const removeWorkout = (store.getState().screen.id) ?
            (<div className='btn-back' style={{ backgroundColor: '#fb4d4d' }}
                onClick={() => {
                    store.dispatch(actions.removeWorkout(store.getState().screen.id))
                    store.dispatch(actions.openMain())
                }}>
                <i className="material-icons" >delete forever</i>
            </div>) :
            null;


        const btnFooterStyle = (this.state.hideFooter === true && mobileCheck()) ? { bottom: '-200px', paddingBottom: '0px' } : null;
        const mainFeedStyle = (this.state.hideFooter === true && mobileCheck()) ? { paddingBottom: '10px' } : { paddingBottom: window.getComputedStyle(document.querySelector('.btn-footer')).height };

        return (
            <div>
                {(this.state.openNameCfg) ? <NameCfg state={this.state} setCfg={(x) => { this.setCfg(x) }} /> : null}
                {(this.state.openSettingCfg) ? <SettingsCfg state={this.state} setCfg={(x) => { this.setCfg(x) }} /> : null}
                <header className="config-header">
                    <div>
                        <div className='btn-back'
                            onClick={() => store.dispatch(actions.openMain())}>
                            <i className="material-icons">keyboard_arrow_left</i>
                        </div>
                        {removeWorkout}
                    </div>
                    <div className='cfg-name'>
                        <div onClick={() => { this.setState({ openNameCfg: true }) }}>
                            {this.state.workout.name}&nbsp;
                            <i className="material-icons">edit</i>
                        </div>

                    </div>
                    <div className='cfg-category'>
                        <div onClick={() => { this.setState({ openNameCfg: true }) }}>
                            {this.state.workout.category}&nbsp;
                            <i className="material-icons">edit</i>
                        </div>
                    </div>
                    <CfgSetBox workout={this.state.workout} openSettingsCfg={() => { this.setState({ openSettingCfg: true }) }} />
                </header>
                <div className="main-feed vh" style={mainFeedStyle}>
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
                                {/* <FeedEx config={this.state.workout} /> */}
                                {exs.map((item, id) =>
                                    <FeedExItem
                                        config={this.state.workout}
                                        item={item}
                                        id={id}
                                        key={id}
                                        changeExName={(id, value) => this.changeExName(id, value)}
                                        removeEx={(id) => this.removeEx(id)}
                                        hideFooter={(x) => this.setState({ hideFooter: x })}
                                    />
                                )}
                                <Adder
                                    addEx={(e) => this.addEx(e)}
                                    hideFooter={(x) => this.setState({ hideFooter: x })}
                                />
                                {(this.state.workout.rounds === 1) ? null :
                                    <div className='roundrest-box'>
                                        Rounds rest time: {toMmSs(this.state.workout.roundRestTime)}
                                    </div>}
                            </div>

                        </div>
                        <div>
                            <i className="material-icons">replay</i>
                        </div>

                    </div>
                </div>
                <div className='btn-footer' style={btnFooterStyle}>
                    <div className='cfg-footer-box'>
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
                    <SaveBtn state={this.state} />
                </div>

            </div>

        )
    }
}



class Adder extends React.Component {

    constructor(props) {
        super(props);
        this.input = React.createRef()
    }

    render() {
        return (
            <div className='adder-box'>
                <input type='text'
                    ref={this.input}
                    onFocus={() => this.props.hideFooter(true)}
                    onBlur={() => this.props.hideFooter(false)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            this.input.current.blur()
                            this.props.addEx(this.input.current.value)
                            this.input.current.value = ''
                        }

                    }}
                ></input>
                <button
                    onClick={() => {
                        console.log('click')
                        if (this.input.current.value !== '') {
                            this.props.addEx(this.input.current.value); this.input.current.value = '';
                        }
                    }}
                >Add</button>
            </div>
        )
    }
}

class SaveBtn extends React.Component {

    render() {
        const store = this.context;

        if (store.getState().screen.id !== null) {
            return (
                <div className='btn' onClick={() => {
                    let currentId = store.getState().screen.id
                    store.dispatch(actions.editWorkout(this.props.state.workout, currentId))
                    store.dispatch(actions.openReview(currentId))
                }}>Save</div>
            )
        } else {
            return (
                <div className='btn' onClick={() => {
                    store.dispatch(actions.addWorkout(this.props.state.workout))
                    let currentId = store.getState().workouts[store.getState().workouts.length - 1].id
                    store.dispatch(actions.openReview(currentId))
                }}>Save</div>
            )
        }

    }
}

class NameCfg extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.state.workout);
    }

    render() {

        if (this.props.state.openNameCfg) {
            return (
                <div className='cfg-overlay'>
                    <div className='cfg-overlay-box'>
                        <div className='name-set-item'>
                            <input type='text' value={this.state.name} onChange={(e) => this.setState({ name: (e.target.value.length !== 0) ? e.target.value.replace(/^./, e.target.value[0].toUpperCase()) : '' })}></input>
                        </div>
                        <div className='name-set-item'>
                            <input type='text' value={this.state.category} onChange={(e) => this.setState({ category: (e.target.value.length !== 0) ? e.target.value.replace(/^./, e.target.value[0].toUpperCase()) : '' })}></input>
                        </div>
                        <div className='btn' onClick={() => { this.props.setCfg(this.state) }}>
                            Save
                    </div>
                    </div>
                </div>)
        }
        else {
            return null
        }

    }
}





