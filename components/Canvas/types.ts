import { ReactNode } from "react";

export interface CanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode[];
}
