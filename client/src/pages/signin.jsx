import React from "react";

const SignIn = () => {

  return (
    <div className="h-screen flex justify-center items-center overflow-x-visible">
      <div className="h-[50%] w-[50%] rounded-lg bg-primary  justify-center">
        <h1 className="text-xl font-bold justify-top my-[1%]"> Sign Into CoCode! </h1>

        <div className="flex flex-col">
          <form className="flex flex-col justify-center items-center">
            <label className = "mt-5 mb-2"> Email </label>
            <input className="w-[80%] h-10 text-center rounded-lg " placeholder="enter your email"></input>
          </form>
        </div>

      </div>

    </div>
  );
};

export default SignIn;