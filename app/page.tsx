"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { LongButton } from "@/components";
import styles from "./styles.module.css";

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
      setUser(data);
    };

    createOrFetchUser();
  }, [session]);

  {
    return (
      <div className={styles.LoginScreen}>
        <div className={styles.LoginScreenInputContainer}>
          <div>
            <span className={styles.TitleFont}>Inculta</span>
          </div>
          <LongButton
            onClick={() => signIn("google")}
            label={"Sign in with Google"}
          />
        </div>
      </div>
    );
  }

  // return <button onClick={() => signIn("google")}>Sign in with Google</button>;
  // <button onClick={() => signOut()}>Sign out</button>
}
