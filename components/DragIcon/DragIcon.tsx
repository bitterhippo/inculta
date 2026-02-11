import styles from "./styles.module.css";
import { useDraggable } from "@dnd-kit/core";
import type { DragIconProps } from "./types";

//TODO: Determine if ID is needed in this component
export const DragIcon = ({ id, xValue, yValue }: DragIconProps) => {
  return (
    <div
      className={styles.DragIcon}
      style={{ position: "absolute", top: yValue, left: xValue }}
    />
  );
};
