import React, { useCallback, useEffect } from "react";
import { useState,useRef } from "react";


const App = () => {
   const [length,setLength]=useState(8)
   const [includeNumbers,setIncludeNumbers]=useState(false)
   const [includeSpecialCharacters,setIncludeSpecialCharacters]=useState(false)
   const [Password,setPassword]=useState('')
    
   const generatePassword=useCallback(()=>{
    let chs='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let pass=""
    if(includeNumbers) chs+='0123456789'
    if(includeSpecialCharacters) chs+='!@#$%^&*()_+'  

    for(let i=0;i<length;i++){
      
      const randomIndex=Math.floor(Math.random()*chs.length)
      pass+=chs[randomIndex]
    }
    setPassword(pass)

   },[includeNumbers,includeSpecialCharacters,length])
    useEffect(()=>{
      generatePassword()
    },[length,includeNumbers,includeSpecialCharacters,generatePassword])
  
    const passwordRef=useRef(null)



   const CopyClipboard=()=>{
    passwordRef.current.select()
     navigator.clipboard.writeText(Password)
   }



  return (
    <>
    <div className="h-screen m-10 w-full flex justify-start flex-col items-center">
     <h1 className="text-4xl font-bold ">Password Generator</h1>

     <div className="m-10 p-4  w-fit rounded-lg shadow-sm shadow-black "> 
       
     <input
        type="text"
        placeholder={Password}
        ref={passwordRef}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        readOnly
      />

      <div className="flex flex-col gap-2">
       <label htmlFor="Length">Length:{length}</label>
       <input
       type='range'
        min='8'
        max='20'
        value={length}
       onChange={((val)=>setLength(val.target.value))}
       />
         <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4"
          onChange={()=>setIncludeNumbers((prev)=>!prev)}
          /> Include Numbers
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4"
          onChange={()=>setIncludeSpecialCharacters((prev)=>!prev)}
          /> Include Special Characters
        </label>   
        

      </div>
      <div className="flex justify-center items-start m-2">
      <button
        className="bg-blue-500 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={CopyClipboard}
        >Copy</button>
      </div>
       
      </div>

     </div>

    
    
    </>
  );
};

export default App;
