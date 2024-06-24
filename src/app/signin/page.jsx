"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const currentUser = useAuth();
  const router = useRouter();
  const [viewPass, setViewPass] = useState(false);

  const togglePass = () => {
    setViewPass(!viewPass);
  };

  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (isLoggingIn) {
      try {
        await login(email, password);
        if (currentUser) {
          router.push("/dashboard/home");
        }
      } catch (err) {
        setError("Incorrect email or password");
        setTimeout(() => {
          setError("");
        }, 3000);
        setEmail("");
        setPassword("");
      }
      return;
    }
  };

  return (
    <main className="bg-signin-bg bg-no-repeat h-screen w-screen bg-cover flex flex-col items-center pt-32">
      <h2 className="sm:text-5xl text-3xl font-extrabold text-black ">
        Hello! Welcome back.
      </h2>
      <p className="italic text-slate-100">Enter your information to login.</p>
      {error && (
        <p className="text-red-500 bg-white rounded-md px-3 py-1 absolute top-5">
          Invalid Email or Password!
        </p>
      )}
      <form
        className="flex flex-col gap-5 sm:w-[400px] w-[300] bg-white px-5 py-8 rounded-2xl sm:mb-20"
        onSubmit={handleSignIn}
      >
        <input
          className="rounded-2xl p-3 bg-slate-300 focus:outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex items-center bg-slate-300 rounded-2xl">
          <input
            className="rounded-2xl p-3 bg-slate-300 focus:outline-none"
            type={viewPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {viewPass ? (
            <GoEyeClosed
              size={50}
              className="p-3 flex-1 rounded-r-2xl cursor-pointer"
              onClick={togglePass}
            />
          ) : (
            <GoEye
              size={50}
              className="p-3 flex-1 rounded-r-2xl cursor-pointer"
              onClick={togglePass}
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-black hover:opacity-70 text-white rounded-2xl p-3"
        >
          Sign In
        </button>
        <p className="my-3">
          Don&apos;t have an account?{" "}
          <Link href="/" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
