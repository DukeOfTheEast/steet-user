import React from "react";
import Link from "next/link";

const DesignerSignUp = () => {
  return (
    <div className="bg-signUp-bg bg-no-repeat h-full w-screen bg-cover flex flex-col items-center pt-16">
    
    <div className="">
    <h1 className="font-sans font-bold sm:text-3xl text-lg mb-5 text-[#000000] ">
              Create your Meet ‘n’ Style account
       </h1>
      </div>
    
    <div>
    <div className="items-center mt-8 ">
    <input type="text" placeholder="First Name" className="py-1 pl-2 pr-14 mr-20 border border-[#000000] focus:outline-none placeholder-[#A9A2A2] rounded-lg" /> 
    <input type="text" placeholder="Last Name" className="py-1 pl-2 pr-14 border border-[#000000] focus:outline-none placeholder-[#A9A2A2] rounded-lg"/>
      </div>
    
      <div className="items-center mt-5 ">
        <div className="mb-5">
         <input type="text" placeholder="Business Name" className="py-1 pl-2 pr-64 border border-[#000000] focus:outline-none placeholder-[#A9A2A2] rounded-lg"/>

        </div>
        <div>
         <input type="email" placeholder="Email" className="py-1 pl-2 pr-64 mb-5 border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] rounded-lg"/>
    
        </div>
    
        <div>
         <input type="password"  placeholder="Password" className="py-1 pl-2 pr-64  border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] rounded-lg"/> 
    
        </div>
      </div>
      <div className="mt-2">
        
      <p> must contain 8 characters</p>
      <p> must contain a number</p>
      <p> must contain a letter</p>
      
    </div>
    
    <div className="mt-2">
    <input type="password"  placeholder="Confirm Password" className="py-1 pl-2 pr-64  border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] rounded-lg"/> 
    
    </div >

    <div>
      <div className="">
        <input type="text" placeholder="Select business location" className="border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] py-1 pl-2 pr-16 my-4 rounded-lg" />
      </div>

    <div className="">
      <input type="text" placeholder="Select fashion category" className="border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] py-1 pl-2 pr-16 rounded-lg" />
    </div>
    </div>
    
    <div className="mt-2 mb-4">
    <p><input type="checkbox" className="w-2.5 h-2.5  "/> Signing up for a Meet 'n' Style account means you agree to our privacy <br /> policy and terms & conditions</p>
    
    </div>
    
    <div className=" items-center text-center ">
      <Link href={""}>
      <button className=" text-[#FFFFFF] bg-[#FF5C00]  py-2 px-32 lg:px-64 text-lg rounded-lg ">Create Designer account</button>
      </Link>
    </div>
    
    <div class="flex items-center ">
      <div class="flex-grow my-12 border-t border-[#000000]"></div>
      <span class="mx-4 text-[#000000]">OR</span>
      <div class="flex-grow border-t border-[#000000]"></div>
    </div>
    
    <div className="items-center text-center">
      <Link href={""}>
      <div>
      <button className=" mb-2 border border-[#000000] lg:w-full px-32 py-2.5 text-[#000000] font-bold text-lg rounded-lg" >Sign up with Google</button>
      </div>
    
      <div>
      <button className=" mt-2 border border-[#000000] px-32 lg:w-full  py-2.5 font-bold text-lg rounded-lg" >Sign up with Facebook</button>
      </div>
    
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

export default DesignerSignUp;
