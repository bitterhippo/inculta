"use client";
import "react";
import styles from "./styles.module.css";
export const Dialog = ({ onClose }) => {
  return (
    <div className={styles.DialogOverlay} onClick={onClose}>
      <div className={styles.DialogContainer}>lol</div>
    </div>
  );
};
