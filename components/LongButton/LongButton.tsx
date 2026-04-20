import styles from "./styles.module.css";
import type { LongButtonProps } from "./types";
import { ArrowLeftCircle, Save } from "react-feather";

export const LongButton = ({
  onClick,
  label,
  iconName,
  isDisabled,
}: LongButtonProps) => {
  const iconMap = {
    save: Save,
    arrowLeftCircle: ArrowLeftCircle,
  };

  const Icon = iconName ? iconMap[iconName] : undefined;

  return (
    <button
      className={`${styles.LongButtonContainer} ${isDisabled ? styles.isDisabled : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {Icon && <Icon className={styles.LongButtonIcon} size={18} />}
      <span
        className={`${styles.LongButtonText} ${isDisabled ? styles.isDisabledText : ""}`}
      >
        {label}
      </span>
    </button>
  );
};
