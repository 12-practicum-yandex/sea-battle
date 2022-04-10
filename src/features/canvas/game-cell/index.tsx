import { Cell } from './Cell';

import { CellDrawProps } from './types';

// Делаем отрисовку ячеек (при инициализации)
export const drawCell = ({ ctx, params }: CellDrawProps) => {
  const cell = new Cell({ ...params });
  if (ctx !== null) {
    cell.drawType(ctx);
  }
};

// Делаем перерисовку отдельной ячейки при клике, чтобы не перерисовывать весь canvas
export const redrawCell = ({ ctx, params }: CellDrawProps) => {
  const cell = new Cell({ ...params });
  if (ctx !== null) {
    cell.clear(ctx);
    cell.drawType(ctx);
  }
};
