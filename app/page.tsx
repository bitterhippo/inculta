"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function LoginButton() {
  const { data: session } = useSession();
  const [user, setUser] = useState();

  console.log("user", user);
  console.log("session", session);

  useEffect(() => {
    if (!session) return;

    let createOrFetchUser = async () => {
      const response = await fetch("/api/createOrGetUserByEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: session.user }),
      });
      const data = await response.json();
      console.log("woot", data);
      // setUser(data);
    };

    createOrFetchUser();
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
