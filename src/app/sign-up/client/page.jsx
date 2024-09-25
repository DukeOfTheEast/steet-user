import React from "react";

const ClientSignUp = () => {
  return (
<div className="bg-signUp-bg bg-no-repeat h-screen w-screen bg-cover flex flex-col items-center pt-32">

<div>
<h1 className="font-sans font-bold sm:text-3xl text-lg mb-5 text-[#000000] ">
          Create your Meet ‘n’ Style account
   </h1>
  </div>

<div>
<div className="items-center mt-8">
    <input type="text" placeholder="First Name" className="py-1 pl-2 pr-14 mr-20 border border-[#000000] focus:outline-none placeholder-[#A9A2A2]" /> 
     <input type="text" placeholder="Last Name" className="py-1 pl-2 pr-14 border border-[#000000] focus:outline-none placeholder-[#A9A2A2]"/>
  </div>
</div>
  
  
</div>
  );
  
 
};

export default ClientSignUp;
