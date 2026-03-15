import styles from "./styles.module.css";
import type { LongButtonProps } from "./types";

export const LongButton = ({
  onClick,
  label,
  isChecked,
  previewContainerContent,
}: LongButtonProps) => {
  return (
    <div onClick={onClick} className={styles.ExpandableContainerSelectButton}>
      <div>
        <input type="checkbox" checked={isChecked}></input>
      </div>
      <div>{label}</div>
      <div className={styles.PreviewContainer}>{previewContainerContent}</div>
    </div>
  );
};
