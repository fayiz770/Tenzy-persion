import React from 'react';

export default function Die(props) {
    return(
        <div className={`die ${props.isHeld ? 'die--true' : ''}`} onClick={props.holdDice}>
            <h2 className='die--number'>{props.value}</h2>
        </div>
    )
};
