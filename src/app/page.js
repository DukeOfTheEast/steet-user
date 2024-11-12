"use client";

// import SignUp from "@/components/signup/page";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LandingPage from "./landingPage/page";

export default function Home() {
  return (
    <main className="">
      <LandingPage />
    </main>
  );
}
