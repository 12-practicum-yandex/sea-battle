import { CellType } from '@features/canvas/game-cell/types';
import { CellProps } from '@features/gameSea/types';
import { redrawCell } from '@features/canvas/game-cell';

type setTypesCells = ({
  cells,
  board,
  isShip,
}: {
  cells: CellProps[] | null;
  board: number[][];
  isShip: boolean;
}) => CellProps[] | null;

type checkProp = (board: number[][], cells: CellProps[]) => CellType | null;

type checkCellAroundType = ({
  board,
  x,
  y,
}: {
  board: number[][];
  x: number;
  y: number;
}) => CellProps | null;

type checkCellAround = ({ board, cell }: { board: number[][]; cell: CellProps }) => {
  [s in string]: CellProps | null;
};

export const setTypesHitOrShip: setTypesCells = ({ cells, board, isShip }) => {
  if (cells === null) return null;

  let cellUpdate: CellProps[] | null = null;
  let type: CellType | null = null;

  if (!isShip) {
    type = checkHit(board, cells);
  } else {
    type = checkShip(board, cells);
  }

  if (type !== null) {
    cellUpdate = cells.map((item) => {
      const cell = JSON.parse(JSON.stringify(item));
      cell.type = type;
      return cell;
    });
  }

  return cellUpdate;
};

export const drawMissAfterDead = ({
  board,
  cells,
  ctx,
}: {
  board: number[][];
  cells: CellProps[];
  ctx: CanvasRenderingContext2D;
}): void => {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const cellsAround = checkCellAround({ board, cell });

    const cellsAroundShip = Object.values(cellsAround).filter(
      (cell) => cell !== null && cell.type === CellType.empty,
    );

    cellsAroundShip.forEach((cell) => {
      if (cell !== null) {
        const { indexX, indexY } = cell;
        redrawCell({ ctx, params: { indexX, indexY, type: CellType.miss } });
      }
    });
  }
};

const checkCellAround: checkCellAround = ({ board, cell }) => {
  const x = cell.indexX;
  const y = cell.indexY;

  const bottomCell = getDataCell({ board, x, y: y + 1 });
  const topCell = getDataCell({ board, x, y: y - 1 });
  const rightCell = getDataCell({ board, x: x + 1, y: y });
  const leftCell = getDataCell({ board, x: x - 1, y: y });

  const topLeft = getDataCell({ board, x: x - 1, y: y - 1 });
  const topRight = getDataCell({ board, x: x + 1, y: y - 1 });
  const bottomLeft = getDataCell({ board, x: x - 1, y: y + 1 });
  const bottomRight = getDataCell({ board, x: x + 1, y: y + 1 });

  return { bottomCell, topCell, rightCell, leftCell, topLeft, topRight, bottomLeft, bottomRight };
};

const getDataCell: checkCellAroundType = ({ board, x, y }) => {
  if (board[y] !== undefined && board[y][x] !== undefined) {
    return { indexX: x, indexY: y, type: board[y][x] };
  } else {
    return null;
  }
};

const checkHit: checkProp = (board, cells) => {
  let type = null;

  if (cells.length === 1) {
    const x = cells[0].indexX;
    const y = cells[0].indexY;

    if (board[y][x] === CellType.empty) {
      type = CellType.miss;
    }
    if (board[y][x] === CellType.ship) {
      type = CellType.hit;
    }
  }

  return type;
};

const checkShip: checkProp = (board, cells) => {
  const type: CellType.ship | null = CellType.ship;

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const cellsAround = checkCellAround({ board, cell });
    const shipsAround = Object.values(cellsAround).filter(
      (cell) => cell !== null && cell.type === CellType.ship,
    );

    if (shipsAround.length > 0) {
      return null;
    }
  }

  return type;
};
