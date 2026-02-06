"use client";

import styles from "./styles.module.css";
import { useDroppable } from "@dnd-kit/core";

export const Canvas = () => {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });
  return (
    <div ref={setNodeRef} className={styles.Canvas}>
      This is the very model of a modern major Canvas
    </div>
  );
};
