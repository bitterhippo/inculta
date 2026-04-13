export interface DragData {
  source: "palette" | "canvas";
  image_url: string;
}

export interface DraggableWrapperProps {
  id: string;
  children: React.ReactNode;
  x?: number;
  y?: number;
  image_url: string;
  inToolbar?: boolean;
}
