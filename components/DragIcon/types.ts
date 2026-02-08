type DeltaObj = {
  x: string;
  y: string;
  xScale: number;
  yScale: number;
};

export interface DragIconProps {
  id: string;
  transform?: DeltaObj;
}
