"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DummyIconProps {
  id: string;
}

export const DragIcon = ({ id }: DummyIconProps) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    width: 40,
    height: 40,
    backgroundColor: "limegreen",
    borderRadius: "8px",
    display: "inline-block",
    margin: "4px",
    cursor: "grab",
  };

  return <div ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};
