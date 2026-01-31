"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import type { ExpandableContainerProps } from "./types";
import styles from "./styles.module.css";

export const ExpandableContainer = ({
  categoryName,
}: ExpandableContainerProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.ClickableContainer}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span>{categoryName}</span>
        <button>
          {expanded ? (
            <ArrowUp className={styles.ExpandableContainerButton} />
          ) : (
            <ArrowDown className={styles.ExpandableContainerButton} />
          )}
        </button>
      </div>
      {expanded && <div className={styles.ContentContainer}>Content</div>}
    </>
  );
};
