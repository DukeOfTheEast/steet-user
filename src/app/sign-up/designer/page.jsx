"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const DesignerSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const router = useRouter();
  const [viewPass, setViewPass] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password, "designer", fullName, businessName);
      router.push("/signin");
      console.log("user signed up");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      setEmail("");
      setPassword("");
    }
    console.log("clicked");
  };

  return (
    <div className="bg-signUp-bg bg-no-repeat h-full w-screen bg-cover flex flex-col items-center pt-32">
      <div>
        <h1 className="font-sans font-bold sm:text-3xl text-lg mb-5 text-[#000000] ">
          Create your Meet &apos;n&apos; Style account
        </h1>
      </div>

      <div>
        <div className="items-center mt-8">
          <input
            type="text"
            placeholder="Full Name"
            className="py-1 pl-2 pr-14 mr-20 border border-[#000000] focus:outline-none placeholder-[#A9A2A2]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Business Name"
            className="py-1 pl-2 pr-14 border border-[#000000] focus:outline-none placeholder-[#A9A2A2]"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        <div className="items-center mt-5 ">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="py-1 pl-2 pr-64 mb-5 border border-[#000000]  focus:outline-none placeholder-[#A9A2A2]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="py-1 pl-2 pr-64  border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2">
          <p> must contain 8 characters</p>
          <p> must contain a number</p>
          <p> must contain a letter</p>
        </div>

        <div className="mt-2">
          <input
            type="password"
            placeholder="Confirm Password"
            className="py-1 pl-2 pr-64  border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <div className="">
            <input
              type="text"
              placeholder="Select business location"
              className="border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] py-1 pl-2 pr-16 my-4"
            />
          </div>

          <div className="">
            <input
              type="text"
              placeholder="Select fashion category"
              className="border border-[#000000]  focus:outline-none placeholder-[#A9A2A2] py-1 pl-2 pr-16 "
            />
          </div>
        </div>

        <div className="mt-2 mb-4">
          <p>
            <input type="checkbox" className="w-2.5 h-2.5  " /> Signing up for a
            Meet &apos;n&apos; Style account means you agree to our privacy{" "}
            <br /> policy and terms & conditions
          </p>
        </div>

        <div className=" items-center text-center ">
          <button
            onClick={handleSignup}
            className=" text-[#FFFFFF] bg-[#FF5C00]  py-2 px-64 text-lg "
          >
            Create Designer account
          </button>
        </div>

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
