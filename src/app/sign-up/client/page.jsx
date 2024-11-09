"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle } from "lucide-react";

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
    <div className="bg-signUp-bg bg-no-repeat h-full w-screen bg-cover flex flex-col items-center pt-32">
      <div>
        <h1 className="font-sans font-bold sm:text-3xl text-lg mb-5 text-[#000000] ">
          Create your Meet &apos;n&apos; Style account
        </h1>
      </div>

      <form className="flex flex-col gap-2">
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
              color={`${password.length >= 8 ? "green" : "white"}`}
              size={15}
            />{" "}
            <p> must contain 8 characters</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${containsNumber(password) ? "green" : "white"}`}
              size={15}
            />
            <p> must contain a number</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${containsLetter(password) ? "green" : "white"}`}
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

        <div className="mt-2 mb-4">
          <p>
            <input type="checkbox" className="w-2.5 h-2.5  " /> Signing up for a
            Meet &apos;n&apos; Style account means you agree to our privacy{" "}
            <br /> policy and terms & conditions
          </p>
        </div>

        <button
          onClick={handleSignup}
          className=" text-[#FFFFFF] bg-[#FF5C00] w-full py-2 text-lg "
        >
          Create fashionista account
        </button>
      </form>

      <div className="flex items-center ">
        <div className="flex-grow my-12 border-t border-[#000000]"></div>
        <span className="mx-4 text-[#000000]">OR</span>
        <div className="flex-grow border-t border-[#000000]"></div>
      </div>

      <div className="items-center text-center">
        <Link href={""}>
          <div>
            <button className=" mb-2 border border-[#000000] w-full py-2.5 text-[#000000] font-bold text-lg">
              Sign up with Google
            </button>
          </div>

          <div>
            <button className=" mt-2 border border-[#000000] w-full py-2.5 font-bold text-lg">
              Sign up with Facebook
            </button>
          </div>
        </Link>
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
