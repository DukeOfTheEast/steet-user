"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle } from "lucide-react";

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
  const [selectedState, setSelectedState] = useState("");
  const [selectedFashion, setSelectedFashion] = useState("");

  function containsNumber(value) {
    return /\d/.test(value);
  }

  function containsLetter(value) {
    return /[a-zA-Z]/.test(value);
  }

  const fashionCategories = [
    "Casual Wear",
    "Formal Wear",
    "Sportswear",
    "Streetwear",
    "Ethnic Wear",
    "Evening Wear",
    "Lingerie",
    "Outerwear",
    "Swimwear",
    "Accessories",
    "Variety",
  ];

  const statesOfNigeria = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT - Abuja",
  ];

  const handleLocation = (event) => {
    setSelectedState(event.target.value);
  };

  const handleFashion = (event) => {
    setSelectedFashion(event.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(
        email,
        password,
        "designer",
        fullName,
        businessName,
        selectedState,
        selectedFashion
      );
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
    <div className="bg-signUp-bg bg-no-repeat h-full w-screen bg-cover flex flex-col items-center pt-16">
      <div>
        <h1 className="font-sans font-bold sm:text-3xl text-lg mb-5 text-[#000000] ">
          Create your Meet &apos;n&apos; Style account
        </h1>
      </div>

      <div>
        <div className="flex gap-2 flex-col sm:flex-row items-center mt-8">
          <input
            type="text"
            placeholder="Full Name"
            className="py-1 pl-2 pr-14 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] sm:w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Business Name"
            className="py-1 pl-2 pr-14 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] sm:w-full"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center mt-5 gap-3 ">
          <input
            type="email"
            placeholder="Email"
            className="py-1 pl-2 rounded-lg border border-[#FF5C00]  focus:outline-none placeholder-[#A9A2A2] sm:w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="py-1 pl-2 rounded-lg border border-[#FF5C00]  focus:outline-none placeholder-[#A9A2A2] sm:w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${password.length >= 8 ? "#FF5C00" : "white"}`}
              size={15}
            />{" "}
            <p> must contain 8 characters</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${containsNumber(password) ? "#FF5C00" : "white"}`}
              size={15}
            />
            <p> must contain a number</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              color={`${containsLetter(password) ? "#FF5C00" : "white"}`}
              size={15}
            />
            <p> must contain a letter</p>
          </div>
        </div>

        <div className="mt-2">
          <input
            type="password"
            placeholder="Confirm Password"
            className="py-1 pl-2 sm:w-full rounded-lg border border-[#FF5C00]  focus:outline-none placeholder-[#A9A2A2] "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="my-3">
          <div className="">
            <select
              className="w-1/3 p-2 focus:outline-none rounded-lg"
              id="state"
              value={selectedState}
              onChange={handleLocation}
            >
              <option value="">--Choose a state--</option>
              {statesOfNigeria.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <select
              className="w-1/3 p-2 mt-1 focus:outline-none rounded-lg"
              id="fashion"
              value={selectedFashion}
              onChange={handleFashion}
            >
              <option value="">--Choose Your Style--</option>
              {fashionCategories.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2 mb-4">
          <p>
            <input type="checkbox" className="w-2.5 h-2.5  " /> Signing up for a
            Meet &apos;n&apos; Style account means you agree to our privacy{" "}
            <br /> policy and terms & conditions
          </p>
        </div>

        <div className="items-center text-center">
          <button
            onClick={handleSignup}
            className="rounded-lg text-[#FFFFFF] bg-[#FF5C00]  py-2 lg:px-64 sm:text-lg"
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
          <div>
            <button className="rounded-lg mb-2 border border-[#000000] w-full py-2.5 text-[#000000] font-bold text-lg">
              Sign up with Google
            </button>
          </div>

          <div>
            <button className="rounded-lg mt-2 border border-[#000000] w-full py-2.5 font-bold text-lg">
              Sign up with Facebook
            </button>
          </div>
        </div>
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

export default DesignerSignUp;
