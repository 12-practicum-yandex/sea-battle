import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { drawCell, redrawCell } from '@features/canvas/game-cell';
import { SIZE_BOARD } from '@constants/game';
import { callbackCellSelect } from '@pages/game';
import { CellType } from '@features/canvas/game-cell/types';
import { Ship } from '@components/ships';

enum PositionShip {
  'vertical',
  'horizontal',
}

export interface IShip {
  id: number;
  settings: {
    countDeck: number;
    positionShip: PositionShip.horizontal;
  };
  translate: {
    x: number;
    y: number;
  };
}

interface IGameSea {
  board: number[][];
  callbackCellSelect: callbackCellSelect;
}

export const GameSea = ({ board, callbackCellSelect }: IGameSea) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [dragShip, setDragShip] = useState<IShip | null>(null);
  const [ships, setShips] = useState<IShip[] | []>([]);

  const setDragShipHandler = useCallback((ship: IShip): void => {
    setDragShip(ship);
  }, []);

  // Заполняем поле значениями элементами и сразу отрисовываем ячейки
  const drawBoard = (canvas: HTMLCanvasElement) => {
    canvas.width = SIZE_BOARD;
    canvas.height = SIZE_BOARD;

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

  const checkInsideCell = useCallback((e, cellType: CellType, checkOffset?: boolean) => {
    const canvas = canvasRef.current;

    if (canvas !== null) {
      const size = SIZE_BOARD / board[0].length;

      const { top, left } = canvas.getBoundingClientRect();

      const x = e.clientX - left;
      const y = e.clientY - top;

      const startCellX = Math.floor(x / size) * size;
      const startCellY = Math.floor(y / size) * size;

      const indexX = startCellX / size;
      const indexY = startCellY / size;

      // Проверка, то не ушли за пределы поля
      if (indexX < board[0].length && indexY < board[0].length) {
        const ctx = canvas.getContext('2d');

        if (ctx !== null) {
          // Передаем родителю индексы ячейки для изменения
          callbackCellSelect({ indexX, indexY, type: cellType });
          // Перерисовываем ячейку
          redrawCell({ ctx, params: { x: startCellX, y: startCellY, size, type: cellType } });
        }

        return true;
      }
    }

    return false;
  }, []);

  // Функция отвечает за перемещение при DND
  const changeTranslateShip = (x: number, y: number, reset?: boolean) => {
    if (dragShip !== null) {
      const allShips = [...ships]; // Не клонируется объект coordinates

      allShips.forEach((ship) => {
        if (ship.id === dragShip.id) {
          const translate = ship.translate;

          reset
            ? (ship.translate = { x, y })
            : (ship.translate = { x: translate.x + x, y: translate.y + y });
        }
      });

      setShips(allShips);
    }
  };

  const mouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    changeTranslateShip(deltaX, deltaY);
  };

  const onMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (dragShip !== null) {
      // Если отпускаем мышь при DND корабля
      const check = checkInsideCell(e, CellType.ship, true);

      check
        ? setShips((prev) => prev.filter((item) => item.id !== dragShip.id))
        : changeTranslateShip(0, 0, true);
    } else {
      // Если отпускаем мышь (клик по ячейке)
      checkInsideCell(e, CellType.hit, true);
    }

    setDragShip(null);
  };

  // Если перетаскиваем за пределы поля, то возвращаем корабль на прежнее место
  const onMouseLeaveHandler = () => {
    changeTranslateShip(0, 0, true);
    setDragShip(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas !== null) {
      drawBoard(canvas);
    }
  }, []);

  useEffect(() => {
    // Хардкод для отрисовки кораблей
    setShips([
      {
        id: 1,
        settings: {
          countDeck: 1,
          positionShip: PositionShip.horizontal,
        },
        translate: {
          x: 0,
          y: 0,
        },
      },
      {
        id: 2,
        settings: {
          countDeck: 1,
          positionShip: PositionShip.horizontal,
        },
        translate: {
          x: 0,
          y: 0,
        },
      },
    ]);
  }, []);

  return (
    <div
      style={{ display: 'flex', width: 'min-content', paddingRight: 20 }}
      onMouseMove={mouseMoveHandler}
      onMouseUp={onMouseUpHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={boardRef}
    >
      <canvas ref={canvasRef} />

      <div className="ships">
        {ships.map((item) => (
          <Ship key={item.id} data={item} isDragCallback={setDragShipHandler} />
        ))}
      </div>
    </div>
  );
};
