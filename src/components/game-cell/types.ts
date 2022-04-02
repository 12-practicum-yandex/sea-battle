// 0 - пустые ячейки; 1 - враг выбрал ячейку и не попал; 2 - ячейки, которые выбрал враг и попал; 3 - ячейки с расположением кораблей
export type CellType = 0 | 1 | 2 | 3;

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
