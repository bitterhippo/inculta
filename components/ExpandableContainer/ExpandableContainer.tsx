"use client";

import React from "react";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import type { ExpandableContainerProps } from "./types";
import styles from "./styles.module.css";

export const ExpandableContainer = ({
  categoryName,
  children,
  placeholder,
}: ExpandableContainerProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const isEmpty = React.Children.count(children) === 0;

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
            {expanded ? (
              <ArrowUp className={styles.ExpandableContainerIcon} size={18} />
            ) : (
              <ArrowDown className={styles.ExpandableContainerIcon} size={18} />
            )}
          </button>
        </div>
      </div>
      <div
        className={styles.ContentContainer}
        style={{
          display: expanded ? "flex" : "none",
        }}
      >
        {!isEmpty ? (
          children
        ) : (
          <p className={styles.ExpandableContainerPlaceholderText}>
            {placeholder}
          </p>
        )}
      </div>
    </div>
  );
};
