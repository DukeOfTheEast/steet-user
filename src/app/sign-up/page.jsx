import React from "react";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="bg-signUp-bg bg-no-repeat h-screen w-screen bg-cover flex flex-col items-center pt-32">
      <div>
        <h1 className="font-sans font-extrabold sm:text-5xl text-lg mb-5 text-[#000000] ">
          Create your Meet ‘n’ Style account
        </h1>
      </div>

      <div className="items-center my-5">
        <div>
          <Link href={"/sign-up/designer"}>
            <button className="bg-[#FF5C00] py-3 mb-2 font-sans text-[#FFFFFF] sm:w-96 w-60 rounded-lg">
              Sign up as a Designer
            </button>
          </Link>
        </div>
        <div>
          <Link href={"/sign-up/client"}>
            <button className="bg-[#FF5C00] py-3 mt-2 text-[#FFFFFF] sm:w-96 w-60 rounded-lg">
              Sign up as a Customer
            </button>
          </Link>
        </div>
      </div>
      <div>
        <p className="font-sans text-sm p-5">
          Already have an account?{" "}
          <span className="text-[#FF5C00]">
            <a href="">Log in</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
