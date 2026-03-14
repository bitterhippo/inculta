import { useDraggable } from "@dnd-kit/core";
import { DraggableWrapperProps, DragData } from "./types";

// HOC: wraps any component
export function DraggableWrapper({
  id,
  children,
  x,
  y,
  imageUrl,
  inToolbar,
}: DraggableWrapperProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      source: inToolbar ? "palette" : "canvas",
      imageUrl,
    } satisfies DragData,
  });
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
