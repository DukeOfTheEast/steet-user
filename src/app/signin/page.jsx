"use client";
// import Image from "next/image";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log({ res });
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="bg-signin-bg bg-no-repeat h-screen w-screen bg-cover flex flex-col items-center pt-32">
      <h2 className="sm:text-5xl text-3xl font-extrabold text-black ">
        Hello! Welcome back.
      </h2>
      <p className="italic text-slate-100">Enter your information to login.</p>
      {error && <p>{error}</p>}
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
        <input
          className="rounded-2xl p-3 bg-slate-300 focus:outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-700 text-white rounded-2xl p-3"
        >
          Sign In
        </button>
        <p className="my-3">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
