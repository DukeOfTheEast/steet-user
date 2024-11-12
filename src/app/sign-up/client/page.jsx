"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Google from "@/images/google.png";
import Facebook from "@/images/facebook.png";

const ClientSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const router = useRouter();
  const [viewPass, setViewPass] = useState(false);

  function containsNumber(value) {
    return /\d/.test(value);
  }

  function containsLetter(value) {
    return /[a-zA-Z]/.test(value);
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password, "client", fullName);
      router.push("/signin");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="bg-signUp-bg bg-no-repeat h-full w-screen bg-cover flex flex-col items-center pt-16">
      <div>
        <h1 className="font-sans font-bold sm:text-3xl text-2xl text-center mb-5 text-[#000000] ">
          Create your Meet &apos;n&apos; Style account
        </h1>
      </div>

      <form className="flex flex-col gap-2 mx-3">
        <input
          type="text"
          placeholder="Full Name"
          className="py-1 px-2 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="py-1 px-2 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="py-1 px-2 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-2">
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${password.length >= 8 ? "green" : "grey"}`}
              size={15}
            />{" "}
            <p> must contain 8 characters</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${containsNumber(password) ? "green" : "grey"}`}
              size={15}
            />
            <p> must contain a number</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${containsLetter(password) ? "green" : "grey"}`}
              size={15}
            />
            <p> must contain a letter</p>
          </div>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          className="py-1 px-2 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="flex items-center gap-2 my-4">
          <input type="checkbox" className="w-5 h-5  " />
          <p className="text-xs sm:text-sm">
            Signing up for a Meet &apos;n&apos; Style account means you agree to
            our privacy policy and terms & conditions
          </p>
        </div>

        <button
          onClick={handleSignup}
          className=" text-[#FFFFFF] bg-[#FF5C00] w-full py-2 text-lg rounded-lg"
        >
          Create fashionista account
        </button>
      </form>

      <div className="flex items-center my-6 ">
        <p className="mx-4 text-[#000000]">OR</p>
      </div>

      <div className="items-center text-center mx-3">
        <button className="flex gap-2 rounded-lg mb-2 border border-[#000000] py-2.5 font-bold lg:text-lg w-full px-12">
          <Image src={Google} alt="google" width={25} height={25} />
          <p>Sign up with Google</p>
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg mt-2 border border-[#000000] py-2.5 font-bold lg:text-lg w-full px-12">
          <Image src={Facebook} alt="google" width={25} height={25} />
          <p>Sign up with Facebook</p>
        </button>
      </div>

      <div>
        <p className="font-sans text-sm p-5">
          Already have an account?{" "}
          <span className="text-[#FF5C00]">
            <a href="/signin">Log in</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ClientSignUp;
