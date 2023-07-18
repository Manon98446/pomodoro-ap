import { useState } from "react";

export default function InDecrement({timerActive, setSecondsTimer, secondsTimer}){
    const increaseTimer = () => {
        if (!timerActive) {
          setSecondsTimer((prevSeconds) => prevSeconds + 60);
        }
    }
    const decreaseTimer =() => {
        if (!timerActive && secondsTimer > 60 ){
            setSecondsTimer((prevSeconds) => prevSeconds - 60);
        }
        
    }
    return(
        <>
            <button className="increment" onClick={increaseTimer}>+</button>
            <button className="decrement" onClick={decreaseTimer}>-</button>
        </>
    )
}