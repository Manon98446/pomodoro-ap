import React, {useEffect, useState} from "react";
import StartPause from "./StartPause";
import ResetTimerButton from "./Reset";

export default function Timer() {
    const [secondsTimer, setSecondsTimer] = useState(1500);
    const [timerActive, setTimerActive] = useState(false);
    //reset
    function ResetTimer(){
        setTimerActive(false); 
        setSecondsTimer(1500);
    }
    //starting timer when it gets activated
    useEffect(() => {
        let interval = null;
        if (timerActive){
            interval = setInterval(() => {
                setSecondsTimer(secondsTimer => secondsTimer - 1)
            }, 1000)
        }
        else if (!timerActive && secondsTimer != 1500){
            clearInterval(interval)
        };
        return () => clearInterval(interval);
    }, [timerActive, secondsTimer]);
    
    return(
        <section>
            <div className="timer">
                {secondsTimer} seconds
            </div>
            <div className="buttons">
                <StartPause timerActive={timerActive} setTimerActive={setTimerActive}/>
                <ResetTimerButton resetTimer={ResetTimer}/>
            </div>
            
        </section>

    )
}