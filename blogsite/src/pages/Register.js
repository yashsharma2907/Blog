import e from "cors";
import React, { useState } from "react";

export default function Register(){
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
    async function register(e) {
      e.preventDefault();
      const response = await fetch('https://blog-h084.onrender.com/register', {
        method: 'POST',
        body: JSON.stringify({username,pass}),
        headers: {'Content-Type':'application/json'},
      });
      if (response.status === 200) {
        alert('registration successful');
      } else {
        alert('registration failed');
      }
    }
    return(
      <form className="register" onSubmit={register}>
         <h1>Register</h1>
      <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
      <input type="password" placeholder="password" value={pass} onChange={e => setPass(e.target.value)}/>
        <button>Register</button>
      </form> 
    )
}