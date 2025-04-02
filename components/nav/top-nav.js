"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Toaster } from "react-hot-toast";

import {
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex justify-between py-1 mx-2">
      <Link href={"/"}>Logo</Link>

      <Toaster />

      <div className="flex justify-end items-center gap-2">
        {isSignedIn && (
          <Link href={"/dashboard"}>{user?.fullName}'s Dashboard</Link>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </nav>
  );
}
