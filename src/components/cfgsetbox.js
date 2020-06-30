import React from 'react';
import './cfgsetbox.css'
import { toMmSs } from '../script/foos'


export function CfgSetBox(props) {

    return (
        <div className='cfg-set-box'>
            <div>
                <div className='cfg-set-item'>
                    <div>
                        <i className="material-icons">timer</i>
                    </div>
                    <div><span>Time on</span></div>
                    <div>{toMmSs(props.workout.timeOn)}</div>
                </div>
            </div>
            <div>
                <div className='cfg-set-item'>
                    <div>
                        <i className="material-icons">timer</i>
                    </div>
                    <div><span>Time off</span></div>
                    <div>{toMmSs(props.workout.timeOff)}</div>
                </div>
            </div>
            <div>
                <div className='cfg-set-item'>
                    <div>
                        <i className="material-icons">av_timer</i>
                    </div>
                    <div><span>Round rest</span></div>
                    <div>{toMmSs(props.workout.roundRestTime)}</div>
                </div>
            </div>
            <div>
                <div className='cfg-set-item'>
                    <div>
                        <i className="material-icons">av_timer</i>
                    </div>
                    <div><span>Ex. rest</span></div>
                    <div>{toMmSs(props.workout.exRestTime)}</div>
                </div>
            </div>
            <div>
                <div className='cfg-set-item'>
                    <div>
                        <i className="material-icons">replay</i>
                    </div>
                    <div><span>Ex. sets</span></div>
                    <div>{'0' + props.workout.sets}</div>
                </div>
            </div>
            <div>
                <div className='cfg-set-item'>
                    <div>
                        <i className="material-icons">repeat</i>
                    </div>
                    <div><span>Rounds</span></div>
                    <div>{'0' + props.workout.rounds}</div>
                </div>
            </div>
            <div className='cfg-set-item' onClick={props.openSettingsCfg}>
                <i className="material-icons">more_vert</i>
            </div>
        </div>
    )
}