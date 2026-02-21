import styles from "./styles.module.css";
import { IconTypes } from "./types";

export const Icon = ({ label, onClick }: IconTypes) => {
  return (
    <div onClick={onClick} className={styles.Icon}>
      {label}
    </div>
  );
};
