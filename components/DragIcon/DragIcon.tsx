import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function DragIcon({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    width: 40,
    height: 40,
    backgroundColor: "limegreen",
    borderRadius: "8px",
    cursor: "grab",
    display: "inline-block",
    margin: 4,
  };

  return <div ref={setNodeRef} style={style} {...attributes} {...listeners} />;
}
