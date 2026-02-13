import { useDraggable } from "@dnd-kit/core";
import { DraggableWrapperProps } from "./types";

// HOC: wraps any component
export function DraggableWrapper({
  id,
  children,
  x,
  y,
  inToolbar,
}: DraggableWrapperProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  const stylePosition = inToolbar ? "relative" : "absolute";
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ position: stylePosition, top: `${y}px`, left: `${x}px` }}
    >
      {children}
    </div>
  );
}
