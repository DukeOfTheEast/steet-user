"use client";

import SignUp from "@/components/signup/page";
import Image from "next/image";
import { useEffect } from "react";
import app from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const auth = getAuth(app);

  const [user] = useAuthState(auth);
  const router = useRouter();

  // if (!user) {
  //   router.push("/");
  // }

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
