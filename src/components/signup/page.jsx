import React from "react";
import Image from "next/image";
import SignupImg from "../../images/signup.png";

const SignUp = () => {
  return (
    <main>
      <div>
        <Image className="" src={SignupImg} priority alt="" />
      </div>
      <div>
        <h3></h3>
        <p></p>
        <div>
          <input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Password" />
          <button>Sign Up</button>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
