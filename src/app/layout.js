"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "video-react/dist/video-react.css";
import { AuthProvider } from "@/context/AuthContext";
import CatProvider from "@/context/CatContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { ChatProvider } from "@/context/ChatContext";
import { CarouselProvider } from "@/context/CarouselContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CarouselProvider>
          <ChatProvider>
            <ProfileProvider>
              <CatProvider>
                <AuthProvider>{children}</AuthProvider>
              </CatProvider>
            </ProfileProvider>
          </ChatProvider>
        </CarouselProvider>

        {/* {children} */}
      </body>
    </html>
  );
}
