import { useState } from "react";

export default function ShortBreak({setSecondsTimer,secondsTimer}){
    const clickShortBreak = () => {
        setSecondsTimer(300)
    }
    return(
        <button onClick={clickShortBreak}>
            Short break
        </button>
    )
}