import { Cell } from './Cell';

import { CellProps } from './types';

export const drawCell = ({ ctx, params }: CellProps) => {
  const cell = new Cell({ ...params });
  if (ctx !== null) {
    cell.drawType(ctx);
  }
};

export const redrawCell = ({ ctx, params }: CellProps) => {
  const cell = new Cell({ ...params });
  if (ctx !== null) {
    cell.clear(ctx);
    cell.drawType(ctx);
  }
};
