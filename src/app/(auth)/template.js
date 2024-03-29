"use client";

import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import Dots from "@/components/Patterns/Dots";

const AuthTemplate = ({ children }) => {
  const { user } = useAuth();

  useLayoutEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  return (
    <div className="grid h-screen md:grid-cols-2">
      <div className="bg-queen-blue flex items-center justify-center relative h-full overflow-hidden">
        <div className="h-20 md:h-auto flex justify-center items-center">
          <img
            className="h-28 md:h-auto"
            src="/images/CiQ_Logo_Stacked.svg"
            alt="Content is queen"
          />
        </div>
        <Dots className="absolute -left-48 -bottom-60 md:-left-40 md:-bottom-40 text-queen-orange" />
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-sm mx-auto space-y-8 px-8 md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
