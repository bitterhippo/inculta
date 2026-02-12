import { useDraggable } from "@dnd-kit/core";
import { DraggableWrapperProps } from "./types";
import styles from "./styles.module.css";

// HOC: wraps any component
export function DraggableWrapper({
  id,
  children,
  x,
  y,
}: DraggableWrapperProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.DraggableWrapper}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {children}
    </div>
  );
}
