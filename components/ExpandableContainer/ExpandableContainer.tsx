"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import type { ExpandableContainerProps } from "./types";
import styles from "./styles.module.css";

export const ExpandableContainer = ({
  categoryName,
  children,
}: ExpandableContainerProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div>
      <div
        className={styles.ClickableContainer}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={styles.ExpandableContainerLabelWrapper}>
          <span>{categoryName}</span>
        </div>
        <div className={styles.ExpanableContainerCounterWrapper}>
          <button className={styles.ExpandableContainerButton}>
            {expanded ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </button>
        </div>
      </div>
      <div
        className={styles.ContentContainer}
        style={{
          display: expanded ? "flex" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};
