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
    <div
      className={styles.ParentContainer}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <button>
        {expanded ? (
          <ArrowUp className={styles.ExpandibleContainerButton} />
        ) : (
          <ArrowDown className={styles.ExpandibleContainerButton} />
        )}
      </button>
      {expanded && <div className={styles.ChildContainer}>Content</div>}
    </div>
  );
};
