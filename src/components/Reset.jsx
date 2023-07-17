import {useState} from 'react';

export default function ResetTimerButton({resetTimer}){
    return(
        <button className="resetButton" onClick={resetTimer}>
            Reset
        </button>
    )
}