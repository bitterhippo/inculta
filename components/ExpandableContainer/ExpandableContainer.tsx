"use client";

import { useState, Children } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import type { ExpandableContainerProps } from "./types";
import styles from "./styles.module.css";

export const ExpandableContainer = ({
  categoryName,
  children,
}: ExpandableContainerProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.ClickableContainer}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={styles.ExpandableContainerLabelWrapper}>
          <span>{categoryName}</span>
        </div>
        <div className={styles.ExpanableContainerCounterWrapper}>
          {/* need a way to remove the utility buttons from being counted */}
          <span>{Children.count(children)}</span>
          <button className={styles.ExpandableContainerButton}>
            {expanded ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </button>
        </div>
      </div>
      {expanded && <div className={styles.ContentContainer}>{children}</div>}
    </>
  );
};
