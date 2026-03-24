import styles from "./styles.module.css";
import { Layers, Grid, Menu } from "react-feather";
import type { SelectTabProps } from "./types";

export const SelectorTab = ({ iconName, label }: SelectTabProps) => {
  const iconMap = {
    layers: Layers,
    grid: Grid,
    menu: Menu,
  };

  const Icon = iconMap[iconName];

  return (
    <div className={styles.IconTabContainer}>
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </div>
  );
};
