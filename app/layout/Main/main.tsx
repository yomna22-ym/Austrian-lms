"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/layout/Navbar/Navbar";
import Footer from "@/app/layout/Footer/footer";

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/modules/website/auth");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Main;
