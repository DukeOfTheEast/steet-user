"use client";
import { useState } from "react";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const router = useRouter();
  const [viewPass, setViewPass] = useState(false);

  const togglePass = () => {
    setViewPass(!viewPass);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
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
      <form onSubmit={handleSignup} className="w-full max-w-sm">
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
              id="signup-email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center bg-slate-300 rounded-2xl">
              <input
                className="rounded-s-2xl p-3 bg-slate-300 focus:outline-none"
                type={viewPass ? "text" : "password"}
                id="signup-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <GoEye /> */}
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
      </form>
    </main>
  );
};

export default SignUp;
