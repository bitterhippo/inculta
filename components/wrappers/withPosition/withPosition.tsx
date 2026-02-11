import styles from "./styles.module.css";
import { withPositionProps } from "./types";
import { useDraggable } from "@dnd-kit/core";

export const withPosition = ({ component }: withPositionProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div {...listeners} {...attributes} ref={setNodeRef}>
      {component}
    </div>
  );
};
