export interface DragData {
  source: "palette" | "canvas";
}

export interface DraggableWrapperProps {
  id: string;
  children: React.ReactNode;
  x?: number;
  y?: number;
  inToolbar?: boolean;
}
