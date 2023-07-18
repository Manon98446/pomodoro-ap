import React, {useEffect, useState} from "react";
import StartPause from "./StartPause";
import ResetTimerButton from "./Reset";
import InDecrement from "./InDecrement";


export default function Timer() {
    const [secondsTimer, setSecondsTimer] = useState(1500);
    const [timerActive, setTimerActive] = useState(false);
    //reset
    function ResetTimer(){
        setTimerActive(false); 
        setSecondsTimer(1500);
    }
    //function to convert time in minutes and seconds insteadof only seconds
    const formatTime = (time) => {
        const minutes = Math.floor(time/60).toString().padStart(2, "0"); 
        const seconds = (time%60).toString().padStart(2,"0");
        return (minutes + ':' + seconds);
    }
    
    //starting timer when it gets activated
    useEffect(() => {
        let interval = null;
        if (timerActive && secondsTimer > 0){
            interval = setInterval(() => {
                setSecondsTimer(secondsTimer => secondsTimer - 1)
            }, 1000)
        }
        else if (!timerActive && secondsTimer != 1500){
            clearInterval(interval)
        };
        return () => clearInterval(interval);
    }, [timerActive, secondsTimer]);
    
    // useEffect for the secondsTimer, when it reaches 0, the window will display an alert and the timer will be unactive
    useEffect(() => {
        if(secondsTimer === 0 ){
            setTimeout(() => {
                alert("Time is up")
            }, 1); 
        }
    },[secondsTimer]);

    return(
        <section>
            <div className="timer">
                {formatTime(secondsTimer)} 
            </div>
            <div className="buttons">
                <StartPause timerActive={timerActive} setTimerActive={setTimerActive}/>
                <ResetTimerButton resetTimer={ResetTimer}/>
                <InDecrement timerActive={timerActive} setSecondsTimer={setSecondsTimer} secondsTimer={secondsTimer}/>
            </div>
            
        </section>

    )
}