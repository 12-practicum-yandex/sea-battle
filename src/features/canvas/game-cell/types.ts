export enum CellType {
  'empty',
  'miss',
  'hit',
  'ship',
}

export type paramsCellProps = {
  x: number;
  y: number;
  type: CellType;
  size: number;
};

export type CellProps = {
  ctx: CanvasRenderingContext2D;
  params: paramsCellProps;
};
