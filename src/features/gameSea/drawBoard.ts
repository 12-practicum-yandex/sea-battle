import { COUNT_CELL, DEFAULT_SIZE_CELL } from '@constants/game';
import { drawCell } from '@features/canvas/game-cell';
import { CellType } from '@features/canvas/game-cell/types';

export const drawBoard = (canvas: HTMLCanvasElement, board: CellType[][]) => {
  canvas.width = DEFAULT_SIZE_CELL * COUNT_CELL;
  canvas.height = DEFAULT_SIZE_CELL * COUNT_CELL;

  const ctx = canvas.getContext('2d');

  if (ctx !== null) {
    for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
        drawCell({ ctx, params: { indexX: cell, indexY: row, type: CellType.empty } });
      }
    }
  }
};
