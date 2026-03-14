export interface DragData {
  source: "palette" | "canvas";
  imageUrl: string;
}

export interface DraggableWrapperProps {
  id: string;
  children: React.ReactNode;
  x?: number;
  y?: number;
  imageUrl: string;
  inToolbar?: boolean;
}
