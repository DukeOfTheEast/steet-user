"use client";

import SignUp from "@/components/signup/page";
import Image from "next/image";
import { useEffect } from "react";
import app from "./firebase/config";

export default function Home() {
  useEffect(() => {
    // Ensure Firebase is initialized only once
    if (!app.apps || !app.apps.length) {
      app;
    }
  }, []);

  return (
    <main className="">
      <SignUp />
    </main>
  );
}
