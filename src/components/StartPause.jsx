import { useRef, useEffect } from "react";
//VITE because it doesn't support the usual web worker, the workerURL is necessary here, not if you use something else than vite!
const workerURL = new URL('./worker.js', import.meta.url).toString();
const myWorker = new Worker(workerURL);


export default function StartPause({secondsTimer, setSecondsTimer, timerActive, setTimerActive}){
    const prevSecondsRef = useRef()
    
    
    useEffect(() => { 
        if(timerActive){
            myWorker.postMessage("start");
            myWorker.addEventListener("message", handleMessage) 
        }
        else{
            
            myWorker.postMessage("stop");            
        }
        function handleMessage (e) {
            if (e.data === "tick") {
                setSecondsTimer((prevSeconds) => prevSeconds - 1 );
            }
        }
        return () => {myWorker.removeEventListener("message", handleMessage)}
    }, [ timerActive])
        
    function toggle () {
        setTimerActive(!timerActive);
    }
    
    
    return(
        <button className="pauseplayButton" onClick={toggle}>
            {timerActive ? 'Pause' : 'Start'}
        </button>
    )
}