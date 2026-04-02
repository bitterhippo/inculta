"use client";

import { SessionProvider } from "next-auth/react";

{
  /*TODO: Provide correct typing for this at a later date */
}
export default function Providers({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
