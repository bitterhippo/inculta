import { ReactNode } from "react";

export interface DraggableWrapperProps {
  id: string;
  children: React.ReactNode;
  x?: number;
  y?: number;
  inToolbar?: boolean;
}
