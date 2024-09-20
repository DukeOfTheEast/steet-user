import React from "react";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="bg-signUp-bg bg-no-repeat h-screen w-screen bg-cover flex flex-col items-center pt-32">
      <div>
        <h1 className="font-sans font-bold text-xl text-[#000000] ">
          Create your Meet ‘n’ Style account
        </h1>
      </div>

      <div>
        <p className="font-sans text-sm p-5">
          Already have an account?{" "}
          <span className="text-[#FF5C00]">
            <a href="">Log in</a>
          </span>
        </p>
      </div>

      <div className="items-center">
        <div>
          <button className="bg-[#FF5C00] py-1 px-20 mb-2 font-sans text-[#FFFFFF] ">
            <a href="">Sign up as a designer</a>
          </button>
        </div>
        <div>
          <button className="bg-[#FF5C00] py-1 px-20 mt-2 text-[#FFFFFF]">
            <a href="">Sign up as a customer </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
