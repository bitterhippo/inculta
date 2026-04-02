"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function LoginButton() {
  const { data: session } = useSession();

  console.log("session", session);

  useEffect(() => {
    if (!session) return;

    let createOrFetchUser = async () => {};
  }, [session]);

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
