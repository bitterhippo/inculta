import styles from "./styles.module.css";
import { useDraggable } from "@dnd-kit/core";
import type { DragIconProps } from "./types";

export const DragIcon = ({ id, xValue, yValue }: DragIconProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      className={styles.DragIcon}
      ref={setNodeRef}
      style={{ position: "absolute", top: yValue, left: xValue }}
      {...listeners}
      {...attributes}
    />
  );
};
