// MyAccount.jsx
import React, { useEffect, useState } from "react";
export const MyAccount = () => {
  const [name,setName] =  useState('');

  const debounce = (fn,delay=1000) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(()=> {
        console.log(...args,'argsssss')
        fn(...args)
      },delay);
    }

  }
  
  const updateText  = debounce((data) => {
    
    setName(data.target.value); 
    console.log('called dobounce function',data.target.value,name);
  })




  return <>
  <div>MyAccount {name}</div>
  
  <input id="name" name="name" type="text"  onChange={updateText} />
  </>;
};
