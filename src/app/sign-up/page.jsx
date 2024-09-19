import React from "react";

const Signup = () => {
  return (
    <div className="bg-signUp-bg bg-no-repeat h-screen w-screen bg-cover flex flex-col items-center pt-32">
      <div className="mt-20" >
        <h1 className="font-sans font-bold text-3xl text-[#000000] ">Create your Meet ‘n’ Style account</h1>
      </div>
      
      <div className="items-center mt-10">
      <div>
        
        <button className="bg-[#FF5C00] py-1 px-64  mb-2 font-sans text-[#FFFFFF] ">  Sign up as a designer </button>
         

      </div>
      <div>
      <button className="bg-[#FF5C00] py-1 px-64 mt-2 ml-1 text-[#FFFFFF]"><a href="">Sign up as a customer </a></button>

      </div>
      </div>

      <div>
        <p className="font-sans text-sm mt-7 p-5">Already have an account? <span className="text-[#FF5C00]"><a href="">Log in</a></span></p>
        </div>
      
    </div>
  );
};

export default Signup;
