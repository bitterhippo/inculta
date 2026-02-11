import styles from "./styles.module.css";
import { useDraggable } from "@dnd-kit/core";
import type { DragIconProps } from "./types";

export const DragIcon = ({ id, xValue, yValue }: DragIconProps) => {
  return (
    <div
      className={styles.DragIcon}
      style={{ position: "absolute", top: yValue, left: xValue }}
    />
  );
};
