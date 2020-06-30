import React from 'react';
import './roundindicator.css'


export function RoundIndicator(props) {

    const boxStyle = {
        gridTemplateColumns: new Array(props.rounds).fill('auto ').reduce((prev, item) => prev + item, ''),
    };

    return (
        <div className='round-ind-box' style={boxStyle}>
            {new Array(props.rounds).fill(1).map((item, ind) => <div className={(ind >= props.currentRound) ? 'round-fut' : 'round-done'}></div>)}
        </div>
    )
}