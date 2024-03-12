"use client";
import { useRef } from "react";
import Image from "next/image";
import SignupImg from "../../images/signup.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSignup = async () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ res });
    } catch (e) {
      console.error(e);
    }

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <main className="flex flex-row">
      <div>
        <Image className="" src={SignupImg} priority alt="" />
      </div>
      <div>
        <h3></h3>
        <p></p>
        <div className="flex flex-col">
          <input type="email" placeholder="Email" ref={emailInputRef} />

          <input
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
          <button onClick={handleSignup} className="bg-black text-white">
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
