"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Facebook from "@/images/facebook.png";
import Google from "@/images/google.png";

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
    <div className="bg-signUp-bg bg-no-repeat h-full w-full bg-cover flex flex-col items-center pt-16">
      <div>
        <h1 className="font-sans font-bold sm:text-3xl text-2xl text-center mb-5 text-[#000000] ">
          Create Your Meet &apos;n&apos; Style Account
        </h1>
      </div>

      <form className="mx-3">
        <div className="flex flex-col items-center mt-5 gap-3 ">
          <div className="flex gap-2 flex-col sm:flex-row items-center mt-8 w-full">
            <input
              type="text"
              placeholder="Full Name"
              className="py-1 px-2 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Business Name"
              className="py-1 px-2 rounded-lg border border-[#FF5C00] focus:outline-none placeholder-[#A9A2A2] w-full"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="py-1 px-2 rounded-lg border border-[#FF5C00]  focus:outline-none placeholder-[#A9A2A2] w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="py-1 px-2 rounded-lg border border-[#FF5C00]  focus:outline-none placeholder-[#A9A2A2] w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
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
          className="py-1 px-2 my-2 w-full rounded-lg border border-[#FF5C00]  focus:outline-none placeholder-[#A9A2A2] "
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="my-3">
          <div className="">
            <select
              className="w-2/3 sm:w-1/3 p-2 focus:outline-none rounded-lg"
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
              className="w-2/3 sm:w-1/3 p-2 mt-1 focus:outline-none rounded-lg"
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

        <div className="flex items-center gap-2 my-4">
          <input type="checkbox" className="w-5 h-5  " />
          <p className="text-xs sm:text-sm">
            Signing up for a Meet &apos;n&apos; Style account means you agree to
            our privacy policy and terms & conditions
          </p>
        </div>

        <div className="items-center text-center">
          <button
            onClick={handleSignup}
            className="rounded-lg text-[#FFFFFF] bg-[#FF5C00] py-2 w-full sm:text-lg"
          >
            Create Designer account
          </button>
        </div>
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

export default DesignerSignUp;
