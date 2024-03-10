"use client";
import { useState } from "react";
import Image from "next/image";
import SignupImg from "../../images/signup.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import auth from "../../app/firebase/config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [createUserWithEmailAndPassword] =
  //   useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async () => {
    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
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
          <input type="text" placeholder="Full name" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="text" placeholder="Phone Number" />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
