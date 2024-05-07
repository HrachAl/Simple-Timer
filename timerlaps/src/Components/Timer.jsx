import React from 'react'
import { useState, useEffect } from 'react'

const Timer = () => {

    const [time,setTime] = useState(0)
    const [running,setRunning] = useState(false)
    const [laps,setLaps] = useState([])
    const [show,setShow] = useState(false)

    useEffect(()=>{
        let interval;
        if(running){
            console.log(running);
           interval = setInterval(() => (setTime(prevTime => prevTime + 10)),10);
             
        }
        
        return ()=> {clearInterval(interval)}
    },[running])


    useEffect(()=>{
        if(time){
            const rest = laps.slice(0,laps.length-1)
            const last = time - rest.reduce((acc,value) => acc + value, 0)
            setLaps([...rest, last])
        }else{
            setLaps([])
        }
    },[time])

    function getH(ms) {
       return ('0' + (ms/10) % 100).slice(-2)
    }

    function getS(ms) {
        return ('0' + Math.floor((ms/1000) % 60)).slice(-2)
    }

    function getM(ms) {
        return ('0' + Math.floor((ms/1000/60) % 60)).slice(-2)
    }

    function formatTime (ms) {
       return `${getM(ms)}:${getS(ms)}:${getH(ms)}`
    }

    function showandsetlaps() {
        setLaps([...laps, 0])
    }
  return (
     <>
            <h1>Simple Timer</h1>
        <main>
            <div className="display">{formatTime(time)}</div>
            <div className="buttons">
                {!running && !time && <button onClick={()=> {
                    setRunning(true)
                    setShow(true)    
                }}>Start</button>}
                {running && <button onClick={()=> setRunning(false)}>Stop</button>}
                {running && <button onClick={showandsetlaps}>Lap</button>}
                {!running && time > 0 && <button onClick={()=> setRunning(true)}>Resume</button>}
                {!running && time > 0 && <button onClick={()=> setTime(0)}>Reset</button>}
            </div>
            
           {
              show && <div className="laps">
              {laps.map((lap,i)=><div key={i}> Lap : {i+1} : {formatTime(lap)} </div>)}
          </div>
           } 
        </main>
     </>
  )
}

export default Timer