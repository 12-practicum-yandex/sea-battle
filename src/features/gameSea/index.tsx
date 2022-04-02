import { useEffect, useRef, useCallback } from 'react';
import { drawCell, redrawCell } from '../canvas/game-cell';
import { SIZE_BOARD } from 'constants/game';
import { callbackCellSelect } from '../../pages/game';
import { CellType } from '../canvas/game-cell/types';

interface IGameSea {
  board: number[][];
  callbackCellSelect: callbackCellSelect;
}

export const GameSea = ({ board, callbackCellSelect }: IGameSea) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Заполняем поле значениями элементами и сразу отрисовываем ячейки
  const drawBoard = (canvas: HTMLCanvasElement) => {
    const size = SIZE_BOARD / board[0].length;
    const ctx = canvas.getContext('2d');

    if (ctx !== null) {
      for (let row = 0; row < board.length; row++) {
        for (let cell = 0; cell < board[row].length; cell++) {
          const x = cell * size;
          const y = row * size;

          drawCell({ ctx, params: { x, y, size, type: CellType.empty } });
        }
      }
    }
  };

  const clickInsideCell = useCallback(({ e, canvas }) => {
    const ctx = canvas.getContext('2d');
    const size = SIZE_BOARD / board[0].length;

    const { top, left } = e.target.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const startCellX = Math.floor(x / size) * size;
    const startCellY = Math.floor(y / size) * size;

    const indexX = startCellX / size;
    const indexY = startCellY / size;

    callbackCellSelect({ indexX, indexY });
    redrawCell({ ctx, params: { x: startCellX, y: startCellY, size, type: CellType.hit } });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas !== null) {
      canvas.addEventListener('click', (e) => clickInsideCell({ e, canvas }));

      canvas.width = SIZE_BOARD;
      canvas.height = SIZE_BOARD;

      drawBoard(canvas);
    }

    return () => {
      if (canvas !== null) {
        canvas.removeEventListener('click', clickInsideCell);
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
};
