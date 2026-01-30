"use client";

import styles from "./styles.module.css";
import { useState } from "react";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const [collapse, setCollapsed] = useState<boolean>(false);

  return (
    <nav className={styles.SideBarContainer}>
      <button onClick={() => setCollapsed((prev) => !prev)}>
        {collapse ? "O" : "C"}
      </button>
      {!collapse && <div className={styles.contents}>{children}</div>}
    </nav>
  );
};
