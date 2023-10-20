import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  
  return (
    <div className="w-full">
      <Link to = "/"> 
        <h1 className = "select-none font-bold text-3xl flex float-left mx-[0.5%] my-[0.1%]"> 
          CoCode 
        </h1> 
      </Link>

      <div className="flex float-right my-[0.5%]">
        <Link to = "/signup">
          <button className="mx-[1%] w-32 rounded-full bg-accent">
            Sign Up
          </button>
        </Link>

        <Link to = "/signin">
          <button className="mx-[1%] w-32 rounded-full bg-accent">
            Sign In
          </button>
        </Link>
      </div>


    </div>

  )
}
