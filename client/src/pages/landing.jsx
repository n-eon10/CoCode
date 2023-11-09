import React from "react";

const Landing = () => {

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center relative top-[20%]">
        <h1 className="animate-typing overflow-hidden whitespace-nowrap text-5xl font-bold">
          Welcome to CoCode
        </h1>
      </div>

      <div className=" relative top-[50%] h-[30%] flex flex-row rounded-lg">
        <div className="bg-white w-[33%] mx-[1%] h-full rounded-lg text-black">
          TALKING POINT 1
        </div>

        <div className="bg-white w-[33%] mx-[1%] h-full rounded-lg text-black">
          TALKING POINT 2
        </div>

        <div className="bg-white w-[33%] mx-[1%] h-full rounded-lg text-black">
          TALKING POINT 3
        </div>
      </div>
    
    </div>
  );
};

export default Landing;