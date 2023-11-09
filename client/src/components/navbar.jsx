import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export const NavBar = () => {
  const { user } = useAuthContext();
  
  return (
    <div className="w-full flex justify-between items-center">
      <Link to = "/"> 
        <h1 className = "select-none font-bold text-3xl px-4 my-[0.1%]"> 
          CoCode 
        </h1> 
      </Link>

      {!user && <div className="flex">
        <Link to = "/signup">
          <button className="px-4 w-32 rounded-full bg-accent">
            Sign Up
          </button>
        </Link>

        <Link to = "/signin">
          <button className="mx-4 w-32 rounded-full bg-accent">
            Sign In
          </button>
        </Link>
      </div>}
    </div>
  )
}

export default NavBar;
