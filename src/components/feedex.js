import React, { useState, useEffect } from 'react';
import './feedex.css'
import { toMmSs } from '../script/foos'

export class FeedExItem extends React.Component {

    constructor(props) {
        super(props);
        this.removeBtn = React.createRef();
        this.state = {
            editMode: false
        }
        this.target = React.createRef();

    }

    outclickListener = (e) => {
        if (e.target !== this.target.current) this.setState({ editMode: false })
    }


    componentDidUpdate(prevProps, prevState) {

        if (this.state.editMode == true && prevState.editMode == false) {
            document.addEventListener('click', this.outclickListener)
        }
        if (this.state.editMode == false && this.target.current.value == '') {
            this.props.changeExName(this.props.id, 'Exercise 1')
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.state.editMode == true && nextState.editMode == false) {
            document.removeEventListener('click', this.outclickListener)
        }

        return true;
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.outclickListener)
    }

    render() {
        const exs = this.props.config.exs;

        const timeOff = (this.props.config.sets === 1) ? null : <div>off: {toMmSs(this.props.config.timeOff)}</div>;
        const repeatIcon = (this.props.config.sets === 1) ? null : <i className="material-icons">repeat</i>;
        const getRandomInt = (max) => {
            return Math.floor(Math.random() * Math.floor(max));
        }
        let i = getRandomInt(20)
        i = 4
        const styleImg = {
            backgroundImage: 'url(' + require(`../img/png/${i}.png`) + ')',
        }

        if (this.props.id !== exs.length - 1) {
            return (<div key={this.props.id} >
                <div className='ex-card'>
                    <div style={styleImg}><div></div></div>
                    <div className='ex-card-config'>
                        <div className='ex-card-name'>
                            <input type='text'
                                ref={this.target}
                                value={this.props.item}
                                onChange={(e) => { this.props.changeExName(this.props.id, e.target.value); }}
                                disabled={(this.state.editMode) ? '' : '1'}
                            ></input>
                        </div>
                        <div className='ex-card-cfg'>
                            <div>
                                on: {toMmSs(this.props.config.timeOn)}
                            </div>
                            {repeatIcon}
                            {timeOff}
                            <div className='sets-span'>
                                <span>&nbsp;x&nbsp;{this.props.config.sets} sets</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            onClick={() => {
                                this.props.removeEx(this.props.id);
                                this.setState({ editMode: !this.state.editMode })
                            }}
                            ref={this.removeBtn}
                            className={(this.state.editMode) ? 'ex-card-remove' : 'ex-card-remove hidden'}>
                            <i className="material-icons">delete_forever</i>
                        </div>
                        <div onClick={() => {
                            this.removeBtn.current.classList.toggle('hidden');
                            this.setState({ editMode: !this.state.editMode })
                        }}>
                            <i className="material-icons">more_vert</i>
                        </div>
                    </div>
                </div>
                <div className='resttime-box'>
                    Ex. rest time: {toMmSs(this.props.config.exRestTime)}
                </div>
            </div>)
        } else {
            return (
                <div key={this.props.id} >
                    <div className='ex-card'>
                        <div style={styleImg}><div></div></div>
                        <div className='ex-card-config'>
                            <div className='ex-card-name'>
                                <input type='text'
                                    ref={this.target}
                                    value={this.props.item}
                                    onChange={(e) => { this.props.changeExName(this.props.id, e.target.value); }}
                                    disabled={(this.state.editMode) ? '' : '1'}
                                ></input>
                            </div>
                            <div className='ex-card-cfg'>
                                <div>
                                    on: {toMmSs(this.props.config.timeOn)}
                                </div>
                                {repeatIcon}
                                {timeOff}
                                <div className='sets-span'>
                                    <span>&nbsp;x&nbsp;{this.props.config.sets} sets</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                onClick={() => {
                                    this.props.removeEx(this.props.id);
                                    this.setState({ editMode: !this.state.editMode })
                                }}
                                ref={this.removeBtn}
                                className={(this.state.editMode) ? 'ex-card-remove' : 'ex-card-remove hidden'}>
                                <i className="material-icons">delete_forever</i>
                            </div>
                            <div onClick={() => {
                                this.removeBtn.current.classList.toggle('hidden');
                                this.setState({ editMode: !this.state.editMode })
                            }}>
                                <i className="material-icons">more_vert</i>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export function FeedEx(props) {

    const exs = props.config.exs;

    const timeOff = (props.config.sets === 1) ? null : <div>off: {toMmSs(props.config.timeOff)}</div>;


    return (
        exs.map((item, id) => {
            if (id !== exs.length - 1) {
                return (<div key={id} >
                    <div className='ex-card'>
                        <div> </div>
                        <div className='ex-card-config'>
                            <div className='ex-card-name'>{item}</div>
                            <div className='ex-card-cfg'>
                                <div>
                                    on: {toMmSs(props.config.timeOn)}
                                </div>
                                {timeOff}
                                <div>
                                    <span>&nbsp;x&nbsp;{props.config.sets} sets</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='ex-card-rem'>
                                <i className="material-icons">delete_forever</i>
                            </div>
                            <div>
                                <i className="material-icons">more_vert</i>
                            </div>
                        </div>
                    </div>
                    <div className='resttime-box'>
                        Ex. rest time: {toMmSs(props.config.exRestTime)}
                    </div>
                </div>)
            } else {
                return (
                    <div key={id} >
                        <div className='ex-card'>
                            <div> </div>
                            <div className='ex-card-config'>
                                <div className='ex-card-name'>{item}</div>
                                <div className='ex-card-cfg'>
                                    <div>
                                        on: {toMmSs(props.config.timeOn)}
                                    </div>
                                    {timeOff}
                                    <div>
                                        <span>&nbsp;x&nbsp;{props.config.sets} sets</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="material-icons">more_vert</i>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }))
}


export function FeedExReview(props) {

    const exs = props.config.exs;

    const timeOff = (props.config.sets === 1) ? null : <div>off: {toMmSs(props.config.timeOff)}</div>;
    const repeatIcon = (props.config.sets === 1) ? null : <i className="material-icons">repeat</i>;

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    let i = getRandomInt(20)
    i = 4
    const styleImg = {
        backgroundImage: 'url(' + require(`../img/png/${i}.png`) + ')',
    }

    return (



        exs.map((item, id) => {
            if (id !== exs.length - 1) {
                return (<div key={id} >
                    <div className='ex-card'>
                        <div style={styleImg}><div></div></div>
                        <div className='ex-card-config'>
                            <div className='ex-card-name'>{item}</div>
                            <div className='ex-card-cfg'>
                                <div>
                                    on: {toMmSs(props.config.timeOn)}
                                </div>
                                {repeatIcon}
                                {timeOff}
                                <div className='sets-span'>
                                    <span>&nbsp;x&nbsp;{props.config.sets} sets</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                {/* <i className="material-icons">more_vert</i> */}
                            </div>
                        </div>
                    </div>
                    <div className='resttime-box'>
                        Ex. rest time: {toMmSs(props.config.exRestTime)}
                    </div>
                </div>)
            } else {
                return (
                    <div key={id} >
                        <div className='ex-card'>
                            <div style={styleImg}><div></div></div>
                            <div className='ex-card-config'>
                                <div className='ex-card-name'>{item}</div>
                                <div className='ex-card-cfg'>
                                    <div>
                                        on: {toMmSs(props.config.timeOn)}
                                    </div>
                                    {repeatIcon}
                                    {timeOff}
                                    <div className='sets-span'>
                                        <span>&nbsp;x&nbsp;{props.config.sets} sets</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <i className="material-icons">more_vert</i> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }))
}