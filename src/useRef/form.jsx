import {useRef, useState} from "react"

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    const handleForm =(e)=>{
          setEmail(emailRef.current.value);
          setPassword(passwordRef.current.value);
          e.preventDefault();
          console.log(email, password);
    }

    return(
            <>
                <form onSubmit={handleForm}>
                    <input type="text" ref={emailRef}></input>
                    <input type="password" ref={passwordRef}></input>
                    <input type="submit" value="submit"></input>
                </form>
            </>
    );
}

export default Login;