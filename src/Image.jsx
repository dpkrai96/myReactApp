import {useEffect, useState} from 'react'

const Image = ()=>{
    const [image, setImage]=useState('');
    useEffect(()=>{
          fetchImage();
    },[]);
    async function  fetchImage (){
       const result = await fetch("https://unsplash.it/320/240");
       if(!result.ok){
                    throw new Error(`HTTP error! Status: ${result.status}`);
       }

               // Convert response to Blob
        const blob = await result.blob();

        // Create a local object URL for the blob
        const objectURL = URL.createObjectURL(blob);
        setImage(objectURL);
    //    const res = await result.json();
    //    console.log(res)
    }

    return (<img  src={image} />)
}

export default Image;
//admin@werindia.com