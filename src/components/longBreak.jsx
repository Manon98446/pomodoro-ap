import { useState } from "react";

export default function LongBreak({setSecondsTimer,secondsTimer}){
    const clickLongBreak = () => {
        setSecondsTimer(900)
    }
    return(
        <button onClick={clickLongBreak}>
            Long break
        </button>
    )
}