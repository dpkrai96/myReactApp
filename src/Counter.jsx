import { useState, useRef, useEffect} from "react";
import  {logcode} from "./utilitiz/helper.js"

function Counter(){
    const counterLocalStorageItem = parseInt(localStorage.getItem('counter'));
    // logcode(counterLocalStorageItem);

    const counterItem = (counterLocalStorageItem) ? counterLocalStorageItem : 0;
    const [counter, setCounter] = useState(counterItem)

    const incrementerrLocalStorageItem = parseInt(localStorage.getItem('incrementer'));
    // logcode(counterLocalStorageItem);

    const incrementerItem = (incrementerrLocalStorageItem) ? incrementerrLocalStorageItem : 0;
    // logcode(counterItem, 'invalid');
    
    const [incrementer, setIncrementer] = useState(incrementerItem)
    
    // const inputRef = useRef(null);

    const handleCounter = (type) =>{
        if(type=='increment'){
            localStorage.setItem('counter', counter+incrementer)
            setCounter(counter+1)
        }else{
            localStorage.setItem('counter', counter-incrementer)
            setCounter(counter-1)
        }
    }
    logcode(incrementer, 30);
    // const addByValue = (value)=>{
    //     const value1 = counter;
    //     logcode(value1, value, 25);
    //     logcode(value, 26);
    //     localStorage.setItem('counter', parseInt(value1) + parseInt(value));
    //     setCounter(parseInt(value1) + parseInt(value));
    //     //   setCounter((value1)=> {logcode(value1, 28); return parseInt(value1) + parseInt(value); });
    //     // console.log(value);
    // }

    const addIncrementerValue= (value)=>{
            localStorage.setItem('incrementer', value)
            setIncrementer(value)        
        }
        const resetVal=()=>{
            localStorage.setItem('counter', 0)
            setCounter(0);
            localStorage.setItem('incrementer', 0)
            logcode(incrementer, 50)
            setIncrementer(0)
    }

// useEffect(()=>{
//     if(inputRef.current){
//         inputRef.current = incrementer;
//         console.log(inputRef.current, 54)
//     }
// })
    return( <div><div>Counter : {counter}</div>
    Clicked the button : <button  onClick= {()=>{handleCounter("increment")}} value="Click Me" style={{"backgroundColor":'yellow', "textColor": "black"}}>increment</button>
    Clicked the button :  <button  onClick= {()=>{handleCounter("decrement")}}  style={{"backgroundColor":'yellow'}}>decrement </button>
        <div>
        Incrementer/ Decrementer: <input type="number" onKeyUp={(e)=> addIncrementerValue(e.target.value)} defaultValue={incrementer}  />
        </div>
               <div>
        Reset Value: <button type="submit" onClick={resetVal}   style={{"backgroundColor":'red'}}>reset </button>
        </div>
    </div>);
}

export  default Counter;