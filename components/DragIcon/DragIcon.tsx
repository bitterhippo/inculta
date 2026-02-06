import { useDraggable } from "@dnd-kit/core";

export const DragIcon = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: 40,
        height: 40,
        backgroundColor: "limegreen",
        borderRadius: 8,
        cursor: "grab",
        margin: 4,
      }}
    />
  );
};
