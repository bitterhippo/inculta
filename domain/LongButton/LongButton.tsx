import styles from "./styles.module.css";
import type { LongButtonProps } from "./types";

export const LongButton = ({
  onClick,
  label,
  isChecked,
  previewContainerContent,
}: LongButtonProps) => {
  return (
    <div onClick={onClick} className={styles.LongButtonContainer}>
      <div>
        <input type="checkbox" checked={isChecked}></input>
      </div>
      <div className={styles.LongButtonLabel}>
        <span>{label}</span>
      </div>
      {previewContainerContent && (
        <div className={styles.LongButtonPreviewContainer}>
          {previewContainerContent}
        </div>
      )}
    </div>
  );
};
