import styles from "./styles.module.css";
import { useDraggable } from "@dnd-kit/core";

export const DragIcon = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      className={styles.DragIcon}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    />
  );
};
