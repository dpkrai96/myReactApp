import {useState,useRef} from "react"

function Interval (){
  const [time, setTime]=  useState(0);

  const intervalRef = useRef(null);
  function handleStart(){

     intervalRef.current = setInterval(()=>{
      setTime(time=>time+1);
    }, 1000);
  }
  function handleStop(){
         clearInterval(intervalRef.current)
  }
  function handleReset(){
      clearInterval(intervalRef.current)
      setTime(0)
  }
  return (
    <>
        <h1>Stopwatch: {time}</h1>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handleReset}>reset</button>
    </>
  )
}

export default Interval;