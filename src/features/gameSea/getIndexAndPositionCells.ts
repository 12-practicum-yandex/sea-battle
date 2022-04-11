import { COUNT_CELL, DEFAULT_SIZE_CELL } from '@constants/game';
import { MouseEvent } from 'react';
import { CellProps, PositionShip, ShipProps } from '@features/gameSea/types';

type getIndexAndPositionCellsType = (
  e: MouseEvent<HTMLDivElement>,
  canvas: HTMLCanvasElement,
  dragShip: ShipProps | null,
) => CellProps[] | null;

// Если не попали в клетку возвращает null
export const getIndexAndPositionCells: getIndexAndPositionCellsType = (e, canvas, dragShip) => {
  const { top, left } = canvas.getBoundingClientRect();
  const offsetX = 0;
  const offsetY = 0;

  // Если расположение начинать с верхней точки точки, а не с текущего положения мыши
  // if (e.target.classList.contains('ship')) {
  //   offsetX = e.nativeEvent.offsetX;
  //   offsetY = e.nativeEvent.offsetY;
  // }

  // Координаты клика
  const x = e.clientX - left - offsetX;
  const y = e.clientY - top - offsetY;

  // Координаты ячейки, в которую кликнули
  const startCellX = Math.floor(x / DEFAULT_SIZE_CELL) * DEFAULT_SIZE_CELL;
  const startCellY = Math.floor(y / DEFAULT_SIZE_CELL) * DEFAULT_SIZE_CELL;

  // Индексы ячейки, в которую кликнули
  const indexX = startCellX / DEFAULT_SIZE_CELL;
  const indexY = startCellY / DEFAULT_SIZE_CELL;

  const result = { indexX, indexY };

  // Получаем все ячейки корабля
  if (indexX < COUNT_CELL && indexY < COUNT_CELL && !!dragShip) {
    return getIndexAndPositionCellsShip(result, dragShip);
  }

  // Если не вышли за пределы поля
  if (indexX < COUNT_CELL && indexY < COUNT_CELL) {
    return [result];
  }

  return null;
};

// Проверяет все ячейки (если располагаем корабль)
const getIndexAndPositionCellsShip = (info: CellProps, dragShip: ShipProps) => {
  const cells = [];
  const { indexX, indexY } = info;
  const { countDeck, positionShip } = dragShip.settings;

  for (let i = 0; i < countDeck; i++) {
    const cell: CellProps = { indexX: indexX, indexY: indexY };

    if (positionShip === PositionShip.horizontal) {
      cell.indexX += i;
    }

    if (positionShip === PositionShip.vertical) {
      cell.indexY += i;
    }

    // Если вышли за пределы поля
    if (cell.indexX >= COUNT_CELL || cell.indexY >= COUNT_CELL) {
      return null;
    }

    cells.push(cell);
  }

  return cells;
};
