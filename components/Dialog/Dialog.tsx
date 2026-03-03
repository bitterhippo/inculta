"use client";
import "react";
import styles from "./styles.module.css";
import { DialogTypes } from "./types";

export const Dialog = ({ children, onClose }: DialogTypes) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };
  return (
    <div className={styles.DialogOverlay} onClick={handleOverlayClick}>
      <div className={styles.DialogContainer}>{children}</div>
    </div>
  );
};
