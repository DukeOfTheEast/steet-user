"use client";

// import SignUp from "@/components/signup/page";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LandingPage from "./landingPage/page";
import { ToastBar, Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="">
      <LandingPage />
      <Toaster />
    </main>
  );
}
