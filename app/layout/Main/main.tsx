"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/layout/Navbar/Navbar";
import Footer from "@/app/layout/Footer/footer";
import { AuthProvider } from "@/app/providers/auth-provider";

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");
  const isPlacementPracticeRoute = pathname?.startsWith(
    "/placement-test/training/mcq-practice",
  );

  return (
    <AuthProvider>
      {isAuthRoute || isPlacementPracticeRoute ? (
        children
      ) : (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      )}
    </AuthProvider>
  );
};

export default Main;
