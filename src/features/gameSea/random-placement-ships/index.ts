import { GameType } from '@pages/game';
import { CellType } from '@features/canvas/game-cell/types';
import { initBoard } from '@pages/game/initBoard';
import { COUNT_CELL } from '@constants/game';
import { BoardType, CellProps, PositionShip, ShipProps } from '@features/gameSea/types';
import { setTypesHitOrShip } from '@features/gameSea/setTypesCells';
import { successTranslateShip } from '@features/gameSea/translateShip';

export const randomPlacementShips = (game: GameType): GameType | null => {
  let ships = JSON.parse(JSON.stringify(game.ships));
  let redraw = false;
  if (ships.length === 0) return null;

  let board = initBoard(COUNT_CELL);

  ships.forEach((ship: ShipProps) => {
    const shipCells = createCellsShip(ship, board);

    // Если за 30 итераций не нашли ячейку, то перерисовываем доску заново
    if (shipCells === null) {
      redraw = true;
    } else {
      ships = successTranslateShip(ships, ship.id, shipCells);
      board = updateBoardHandler(shipCells, CellType.ship, board);
    }
  });

  if (redraw) {
    return randomPlacementShips(game);
  } else {
    return { board, ships };
  }
};

// Создаем ячейки для корабля в которых он будет расположен
const createCellsShip = (
  ship: ShipProps,
  board: BoardType,
  maxIteration = 30,
): CellProps[] | null => {
  const randomCell = getRandomCell();
  const randomPosition = getRandomPosition(); // Выставляем рандомное позиционирование у корабля

  ship.settings.positionShip = randomPosition;

  let fieldLimits = false;
  const cells: CellProps[] = [];

  Array(ship.hp)
    .fill('')
    .forEach((_, i) => {
      let indexX = randomCell.indexX;
      let indexY = randomCell.indexY;

      randomPosition === PositionShip.vertical ? (indexX += i) : (indexY += i);

      // Если вышли за пределы поля
      if (indexX < 0 || indexX > 9 || indexY > 9 || indexY < 0) {
        fieldLimits = true;
      }

      cells.push({ indexX, indexY, type: randomCell.type });
    });

  const cellsWithShip = setTypesHitOrShip({ cells, board, isShip: true }); // Проверка - можно ли расположить корабль или нанести удар

  if (maxIteration === 0) {
    return null;
  }

  if (cellsWithShip === null || fieldLimits) {
    return createCellsShip(ship, board, maxIteration - 1);
  }

  return cellsWithShip;
};

// Обновляем доску
const updateBoardHandler = (cells: CellProps[], cellType: CellType, board: BoardType) => {
  const boardUpdate = JSON.parse(JSON.stringify(board));

  cells.forEach((cell) => {
    boardUpdate[cell.indexY][cell.indexX] = cell.type;
  });

  return boardUpdate;
};

// Получаем рандомное расположение корабля (вертикальное или горизонтальное)
const getRandomPosition = (): PositionShip => {
  return Math.floor(Math.random() * 2);
};

// Получаем данные рандомной ячейки доски
const getRandomCell = (): CellProps => {
  const indexX = Math.floor(Math.random() * 9);
  const indexY = Math.floor(Math.random() * 9);

  return { indexX, indexY, type: CellType.ship };
};
