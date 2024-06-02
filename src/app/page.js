"use client";

import SignUp from "@/components/signup/page";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function Home() {
  return (
    <main className="">
      <SignUp />
    </main>
  );
}
