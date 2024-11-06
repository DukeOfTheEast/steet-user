"use client";

// import SignUp from "@/components/signup/page";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Signup from "./sign-up/page";

export default function Home() {
  return (
    <main className="">
      <Signup />
    </main>
  );
}
