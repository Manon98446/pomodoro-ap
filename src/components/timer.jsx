import React, {useEffect, useState} from "react";
import StartPause from "./StartPause";
import ResetTimerButton from "./Reset";
import InDecrement from "./InDecrement";
import ShortBreak from "./shortBreak";
import LongBreak from "./longBreak";
import SetWorkTimer from "./setWork";
import soundFile from "../assets/Moo-sound-effect-2.mp3";
import ReactModal from "react-modal";
import "./modal.css";


export default function Timer() {
    const [secondsTimer, setSecondsTimer] = useState(1500);
    const [timerActive, setTimerActive] = useState(false);
    const [isModalOpen, setIsModalOpen] =useState(false)
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
    //function to dynamically update the title
    const updateTitle = (minutes, seconds) => {
        document.title = minutes + ':' + seconds + ' - ' + 'Pomodoro';
    }
    //modals
    const handleStartAnotherRound = () => {
        setSecondsTimer(1500);
        setTimerActive(true);
        setIsModalOpen(false); // Close the modal
        // Additional logic if needed
    };
    
      const handleTakeABreak = () => {
        setSecondsTimer(300);
        setTimerActive(true);
        setIsModalOpen(false); // Close the modal
        // Additional logic if needed
    };
    
    //THIS ONE IS WORKING BUT DELAYED starting timer when it gets activated
    /*useEffect(() => {
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
    }, [timerActive, secondsTimer]);*/  
  
    // useEffect for the secondsTimer, when it reaches 0, the window will display an alert and the timer will be unactive
    //second part is from the function above to dynamically change the title and display the remaining time 
    useEffect(() => {
        if(secondsTimer === 0 ){
            const audio = new Audio(soundFile);
            audio.play();
            setTimerActive(false);
            setIsModalOpen(true);
        }
        updateTitle(Math.floor(secondsTimer/60), (secondsTimer%60))
    },[secondsTimer]);

    return(
        <section>
            <div className="chooseTimer">
                <SetWorkTimer setSecondsTimer={setSecondsTimer} secondsTimer={secondsTimer}/>
                <ShortBreak setSecondsTimer={setSecondsTimer} secondsTimer={secondsTimer}/>
                <LongBreak setSecondsTimer={setSecondsTimer} secondsTimer={secondsTimer}/>
            </div>
            <div className="timerContainer">
                <div className="timer" id="clock">
                    <span id="countdown">{formatTime(secondsTimer)} </span>
                    <StartPause setSecondsTimer={setSecondsTimer} secondsTimer={secondsTimer} timerActive={timerActive} setTimerActive={setTimerActive}id="start"/>
                </div>
                <div className="buttons" id="controls">
                    
                    <ResetTimerButton resetTimer={ResetTimer} id="reset"/>
                    <InDecrement timerActive={timerActive} setSecondsTimer={setSecondsTimer} secondsTimer={secondsTimer}/>
                </div>
            </div>
            <div className="modalBreak">
                <ReactModal 
                    isOpen={isModalOpen} 
                    className="modal-content" // Apply the modal-content class
                    overlayClassName="modal-overlay" // Apply the modal-overlay class
                    ariaHideApp={false} //To avoid accessibility issues when the modal is on 
                >
                    <h2>Time's up!</h2>
                    <p>What would you like to do next?</p>
                    <div className="modal-buttons">
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                        <button onClick={handleStartAnotherRound}>Start Another Round</button>
                        <button onClick={handleTakeABreak}>Take a Break</button>
                    </div> {/*modal content*/}
                </ReactModal>
            </div>
            
        </section>

    )
}