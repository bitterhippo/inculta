import { IconButtonTypes } from "./types";
import styles from "./styles.module.css";

export const IconButton = ({ onClick, icon, label }: IconButtonTypes) => {
  return (
    <button onClick={onClick} className={styles.IconButton}>
      {label}
    </button>
  );
};
