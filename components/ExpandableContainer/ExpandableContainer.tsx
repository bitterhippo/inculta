"use client";

import { useState, Children } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import type { ExpandableContainerProps } from "./types";
import styles from "./styles.module.css";

export const ExpandableContainer = ({
  categoryName,
  children,
  contentDirection,
}: ExpandableContainerProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const direction = contentDirection ?? "row";

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
          {/* TODO: need a way to remove the utility buttons from being counted */}
          <span>{Children.count(children)}</span>
          <button className={styles.ExpandableContainerButton}>
            {expanded ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </button>
        </div>
      </div>
      <div
        className={`${styles.ContentContainer} ${
          direction === "row"
            ? styles.ContentContainerFlexRow
            : styles.ContentContainerFlexColumn
        }`}
        style={{
          display: expanded ? "flex" : "none",
          flexDirection: direction,
          gap: "8px",
        }}
      >
        {children}
      </div>
    </div>
  );
};
