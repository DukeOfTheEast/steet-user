"use client";
import { useRef, useState } from "react";
import Image from "next/image";
// import SignupImg from "../../images/signup.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "@/app/firebase/config";
import { useRouter } from "next/navigation";
// import auth from "../../app/firebase/config";
import Link from "next/link";

const SignUp = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {
      const auth = getAuth(app);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ res });
      router.push("/signin");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <main className="bg-signup-bg bg-no-repeat h-screen w-screen bg-cover flex flex-col items-center">
      <div className="my-10 text-center sm:mt-20">
        <h3 className="sm:text-5xl text-3xl font-extrabold text-neutral-700">
          Welcome to FrancisCoutures
        </h3>
        <p className="italic text-slate-100">
          You are one step closer to <br /> start creating your customers
          folder.
        </p>
      </div>
      {error && (
        <p className="text-red-500 bg-white rounded-md px-3 py-1 absolute top-5">
          Input cannot be empty!
        </p>
      )}
      <div className="sm:w-[400px] w-[300] bg-white px-5 py-8 rounded-2xl sm:mb-20">
        <div className="flex flex-col gap-5">
          <input
            className="rounded-2xl p-3 bg-slate-300 focus:outline-none"
            type="email"
            placeholder="Email"
            ref={emailInputRef}
          />

          <input
            className="rounded-2xl p-3 bg-slate-300 focus:outline-none"
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
          <button
            onClick={handleSignup}
            className="bg-black hover:opacity-70 text-white rounded-2xl p-3"
          >
            Sign Up
          </button>
        </div>
        <p className="my-5">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
