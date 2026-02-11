import { ReactNode } from "react";

export interface WithPositionProps {
  id: string;
  component: ReactNode;
  x: number;
  y: number;
}
