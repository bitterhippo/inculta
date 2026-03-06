"use client";

import styles from "./styles.module.css";
import { ButtonProps } from "./types";

export const Button = ({ onClick, label, isDisabled }: ButtonProps) => {
  return (
    <button
      className={isDisabled ? styles.ButtonDisabledStyles : styles.ButtonStyles}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};
