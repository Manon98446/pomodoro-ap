import { useState } from "react";

export default function SetWorkTimer({setSecondsTimer,secondsTimer}){
    const clickWorkTimer = () => {
        setSecondsTimer(1500)
    }
    return(
        <button onClick={clickWorkTimer}>
            Get back to work!
        </button>
    )
}