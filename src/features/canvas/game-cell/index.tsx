import { Cell } from './Cell';

import { CellProps } from './types';

// Делаем отрисовку ячеек (при инициализации)
export const drawCell = ({ ctx, params }: CellProps) => {
  const cell = new Cell({ ...params });
  if (ctx !== null) {
    cell.drawType(ctx);
  }
};

// Делаем перерисовку отдельной ячейки при клике, чтобы не перерисовывать весь canvas
export const redrawCell = ({ ctx, params }: CellProps) => {
  const cell = new Cell({ ...params });
  if (ctx !== null) {
    cell.clear(ctx);
    cell.drawType(ctx);
  }
};
