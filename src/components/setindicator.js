import React from 'react';
import './setindicator.css'



export function SetIndicator(props) {
    const boxStyle = {
        gridTemplateColumns: new Array(props.sets).fill('auto ').reduce((prev, item) => prev + item, ''),
    };

    if (props.sets > 1) {
        return (
            <div>
                <div className='ind-name'>Set: {props.currentSet} / {props.sets}</div>
                <div className='set-ind-box' style={boxStyle}>
                    {new Array(props.sets).fill(1).map((item, ind) => <div key={ind} className={(ind >= props.currentSet) ? 'set-fut' : 'set-done'}></div>)}
                </div>
            </div>
        )
    } else return null;
}

export function RoundIndicator(props) {

    const boxStyle = {
        gridTemplateColumns: new Array(props.rounds).fill('auto ').reduce((prev, item) => prev + item, ''),
    };

    if (props.rounds > 1) {
        return (
            <div>
                <div className='ind-name'>Round: {props.currentRound} / {props.rounds}</div>
                <div className='round-ind-box' style={boxStyle}>
                    {new Array(props.rounds).fill(1).map((item, ind) => <div key={ind} className={(ind >= props.currentRound) ? 'round-fut' : 'round-done'}></div>)}
                </div>
            </div>
        )
    } else return null;
}

export function ExIndicator(props) {

    const boxStyle = {
        gridTemplateColumns: new Array(props.exs).fill('auto ').reduce((prev, item) => prev + item, ''),
    };

    if (props.exs > 1) {
        return (
            <div>
                <div className='ind-name'>Ex.: {props.currentEx} / {props.exs}</div>
                <div className='round-ind-box' style={boxStyle}>
                    {new Array(props.exs).fill(1).map((item, ind) => <div key={ind} className={(ind >= props.currentEx) ? 'round-fut' : 'round-done'}></div>)}
                </div>
            </div>
        )
    } else return null;
}