"use client";

import styles from "./styles.module.css";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useState } from "react";

export const SideBar = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <nav
      className={`${styles.SideBarContainer} ${
        collapsed ? styles.collapsed : ""
      } `}
    >
      <button
        className={styles.ToggleButton}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {collapsed ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
      </button>
      {!collapsed && <div className={styles.contents}>{children}</div>}
    </nav>
  );
};
