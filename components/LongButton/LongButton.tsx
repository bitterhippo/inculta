import styles from "./styles.module.css";
import type { LongButtonProps } from "./types";

export const LongButton = ({ onClick, label }: LongButtonProps) => {
  return (
    <div className={styles.LongButtonContainer} onClick={onClick}>
      <span className={styles.LongButtonText}>{label}</span>
    </div>
  );
};
