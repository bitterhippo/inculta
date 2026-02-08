"use client";

import styles from "./styles.module.css";
import { useDroppable } from "@dnd-kit/core";
import { CanvasProps } from "./types";

export const Canvas = ({ children }: CanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });
  return (
    <div ref={setNodeRef} className={styles.Canvas}>
      {children}
    </div>
  );
};
