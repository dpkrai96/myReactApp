import {useRef} from "react"

function Video(){
const videoRef = useRef(null);

const handleStart=function(){
    videoRef.current.play();
}

const handleStop = function (){
    videoRef.current.pause();
}
const handleRestart = function(){
    videoRef.current.currentTime = 0;
}
    return (
        <>
        <h1>My first video player</h1>

        <video src="./strike.mp4" ref={videoRef} width="320" height="240" ></video>

        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handleRestart}>restart</button>
        </>
    )
}

export default Video;