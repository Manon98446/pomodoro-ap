import { useState } from "react";

export default function StartPause({timerActive, setTimerActive}){
    function toggle () {
        setTimerActive(!timerActive);
    }
    return(
        <button className="pauseplayButton" onClick={toggle}>
            {timerActive ? 'Pause' : 'Start'}
        </button>
    )
}