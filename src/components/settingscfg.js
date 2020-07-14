import React from 'react'
import '../components/settingscfg.css'
import { toMmSs, toSec, setCaretPosition } from '../script/foos'

export class SettingsCfg extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.state.workout);
        this.warmUp = React.createRef()
        this.timeOn = React.createRef()
        this.timeOff = React.createRef()
        this.exRestTime = React.createRef()
        this.roundRestTime = React.createRef()
        this.ref = null
        this.curSelectPos = null
    }

    changeInt(oper, field) {
        const newState = Object.assign({}, this.state);
        if (oper === '+' && newState[field] !== 99) {
            newState[field]++;
        }
        if (oper === '-' && newState[field] !== 1) {
            newState[field]--;
        }
        this.setState(newState)
    }

    changeMmSs(e, field, ref) {

        let arr = e.target.value.split('')
        arr.splice(e.target.selectionStart, 1)
        if (e.target.selectionStart === 3) arr[2] = ':'
        if (e.target.selectionStart === 6) {
            arr[5] = ''
        }
        console.log(e.target.value)
        if (!!(e.target.value.split('')[e.target.selectionStart - 1]) && e.target.value.split('')[e.target.selectionStart - 1].match(/[0-9]/)) {
            console.log('yes')
            this.ref = ref
            this.curSelectPos = e.target.selectionStart
            this.setState({ [field]: toSec(arr.join('')) })
        } else {
            console.log('no')
            this.ref = ref
            this.curSelectPos = e.target.selectionStart
            this.forceUpdate()
        }
        if (toSec(arr.join('')) < 5) this.setState({ [field]: 5 })
    }

    componentDidUpdate() {
        if (this.curSelectPos === 5) this.curSelectPos = 0
        if (this.curSelectPos === 2) this.curSelectPos = 3
        if (this.ref) setCaretPosition(this.ref.current, this.curSelectPos)
    }


    render() {

        const toOo = (item) => {
            if (String(item).length === 2) return item;
            return '0' + item
        }

        if (this.props.state.openSettingCfg) {

            return (
                <div className='cfg-overlay disable-select'>
                    <div className='cfg-overlay-box'>
                        <div className='settngs-cfg-box'>
                            <div>
                                <div><span>Rounds</span></div>
                                <div>
                                    <i className="material-icons" onClick={() => this.changeInt('-', 'rounds')}>remove_circle_outline</i>
                                    <span className='int-val'>{toOo(this.state.rounds)}</span>
                                    <i className="material-icons" onClick={() => this.changeInt('+', 'rounds')}>add_circle_outline</i>
                                </div>
                            </div>
                            <div>
                                <div>Sets in ex.</div>
                                <div>
                                    <i className="material-icons" onClick={() => this.changeInt('-', 'sets')}>remove_circle_outline</i>
                                    <span className='int-val'>{toOo(this.state.sets)}</span>
                                    <i className="material-icons" onClick={() => this.changeInt('+', 'sets')}>add_circle_outline</i>
                                </div>
                            </div>
                            <div>
                                <div>Warm up</div>
                                <div>
                                    <input className='mmss-val' type='text' ref={this.warmUp} onKeyDown={(e) => { if (e.keyCode === 13) this.warmUp.current.blur() }} value={toMmSs(this.state.warmUp)} onChange={(e) => this.changeMmSs(e, 'warmUp', this.warmUp)}></input>
                                </div>
                            </div>
                            <div>
                                <div>Time on</div>
                                <div>
                                    <input className='mmss-val' type='text' ref={this.timeOn} onKeyDown={(e) => { if (e.keyCode === 13) this.timeOn.current.blur() }} value={toMmSs(this.state.timeOn)} onChange={(e) => this.changeMmSs(e, 'timeOn', this.timeOn)}></input>
                                </div>
                            </div>
                            <div>
                                <div>Time off</div>
                                <div>
                                    <input className='mmss-val' type='text' ref={this.timeOff} onKeyDown={(e) => { if (e.keyCode === 13) this.timeOff.current.blur() }} value={toMmSs(this.state.timeOff)} onChange={(e) => this.changeMmSs(e, 'timeOff', this.timeOff)}></input>
                                </div>
                            </div>
                            <div>
                                <div>Ex. rest</div>
                                <div>
                                    <input type='text' className='mmss-val' ref={this.exRestTime} onKeyDown={(e) => { if (e.keyCode === 13) this.exRestTime.current.blur() }} value={toMmSs(this.state.exRestTime)} onChange={(e) => this.changeMmSs(e, 'exRestTime', this.exRestTime)}></input>
                                </div>
                            </div>
                            <div>
                                <div>Rounds rest</div>
                                <div>
                                    <input type='text' className='mmss-val' ref={this.roundRestTime} onKeyDown={(e) => { if (e.keyCode === 13) this.roundRestTime.current.blur() }} value={toMmSs(this.state.roundRestTime)} onChange={(e) => this.changeMmSs(e, 'roundRestTime', this.roundRestTime)}></input>
                                </div>
                            </div>
                        </div>
                        <div className='btn' onClick={() => { this.props.setCfg(this.state); }}>
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



