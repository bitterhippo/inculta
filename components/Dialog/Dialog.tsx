"use client";
import "react";
import styles from "./styles.module.css";
import { DialogTypes } from "./types";

export const Dialog = ({ children, onClose }: DialogTypes) => {
  return (
    <div className={styles.DialogOverlay} onClick={onClose}>
      <div className={styles.DialogContainer}>{children}</div>
    </div>
  );
};
