import styles from "./styles.module.css";
import { Layers, Grid, Menu } from "react-feather";
import type { SelectTabProps } from "./types";

export const SelectorTab = ({
  iconName,
  label,
  isSelected,
  onClick,
}: SelectTabProps) => {
  const iconMap = {
    layers: Layers,
    grid: Grid,
    menu: Menu,
  };

  const Icon = iconMap[iconName];

  return (
    <div className={styles.SelectorTabIconContainer} onClick={onClick}>
      <div
        className={`${styles.SelectorTabIndicator} ${
          isSelected ? styles.Selected : ""
        }`}
      ></div>
      {Icon && <Icon size={18} className={styles.SelectorTabIconStyles} />}
      <span>{label}</span>
    </div>
  );
};
