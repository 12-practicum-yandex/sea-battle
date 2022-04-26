import { COUNT_CELL, DEFAULT_SIZE_CELL } from '@constants/game';
import { drawCell, redrawCell } from '@features/canvas/game-cell';
import { CellType } from '@features/canvas/game-cell/types';
import { CellProps } from '@features/gameSea/types';

export const drawBoard = (canvas: HTMLCanvasElement, board: CellType[][], reset: boolean) => {
  canvas.width = DEFAULT_SIZE_CELL * COUNT_CELL;
  canvas.height = DEFAULT_SIZE_CELL * COUNT_CELL;

  const ctx = canvas.getContext('2d');

  if (ctx !== null) {
    for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
        const type = reset ? CellType.empty : board[row][cell];
        drawCell({ ctx, params: { indexX: cell, indexY: row, type } });
      }
    }
  }
};

// Отрисовка ячеек
export const drawCells = ({
  typesCell,
  ctx,
}: {
  typesCell: CellProps[] | null;
  ctx: CanvasRenderingContext2D | null;
}) => {
  if (typesCell === null || ctx === null) return;

  typesCell.forEach((cell) => {
    redrawCell({
      ctx,
      params: {
        indexX: cell.indexX,
        indexY: cell.indexY,
        type: cell.type,
      },
    });
  });
};
