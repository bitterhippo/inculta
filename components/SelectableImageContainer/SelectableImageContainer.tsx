"use client";

import styles from "./styles.module.css";
import type { SelectableImageContainerProps } from "./types";

export const SelectableImageContainer = ({
  imgProps,
  onClick,
  isSelected,
}: SelectableImageContainerProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.SelectableImageContainerContainer} ${
        isSelected ? styles.Selected : ""
      }`}
    >
      <img {...imgProps} className={styles.SelectableImageContainerImage} />
    </div>
  );
};
