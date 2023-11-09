import React from "react";
import { useLogin } from "../hooks/useLogin.jsx";
import { useState } from "react";

const SignIn = () => {

  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await login(email, password);
  }

  return (
    <div className='flex h-[calc(100vh-38px)] md:h-[calc(100vh-44px)] lg:h-[calc(100vh-61px)] justify-center w-full bg-background '>
      <form className=" self-center items-center text-center w-full max-w-lg p-4 rounded m-5 bg-primary " onSubmit={handleSubmit}>
        <h1 className="text-customtxt text-xl font-bold">Log into CoCode</h1>
        <div className="flex flex-col">
          <label className="text-customtxt text-md font-bold w-full">Email</label>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            id = 'email'
            type ='text' 
            className = "input flex justify-center items-center text-center text-black "
            placeholder='Enter your email'
          />
        </div>

        <div className="flex flex-col">
          <label className="text-customtxt text-md font-bold">Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            id = 'password' 
            type ='password' 
            className="input flex justify-center items-center text-center text-black"
            placeholder='Enter your password'
          />
        </div>
        <button id = 'BtnConfirm' className = ' font-bold rounded-full bg-secondary hover:bg-accent text-white w-32 h-12 my-2'> 
          Login
        </button> 
      </form>
    </div>
  )
}

export default SignIn;