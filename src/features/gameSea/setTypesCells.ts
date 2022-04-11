import { CellType } from '@features/canvas/game-cell/types';
import { CellProps } from '@features/gameSea/types';

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

export const setTypesCells: setTypesCells = ({ cells, board, isShip }) => {
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
  let type: CellType.ship | null = CellType.ship;

  for (let i = 0; i < cells.length; i++) {
    const x = cells[i].indexX;
    const y = cells[i].indexY;

    const isBottomCell = (board[y + 1] && board[y + 1][x]) !== undefined;
    const isTopCell = (board[y - 1] && board[y - 1][x]) !== undefined;
    const isRightCell = board[y][x + 1] !== undefined;
    const isLeftCell = board[y][x - 1] !== undefined;

    const topLeftCorner = isTopCell && isLeftCell;
    const topRightCorner = isTopCell && isRightCell;
    const bottomLeftCorner = isBottomCell && isLeftCell;
    const bottomRightCorner = isBottomCell && isRightCell;

    if (
      (isBottomCell && board[y + 1][x] === CellType.ship) ||
      (isTopCell && board[y - 1][x] === CellType.ship) ||
      (isRightCell && board[y][x + 1] === CellType.ship) ||
      (isLeftCell && board[y][x - 1] === CellType.ship) ||
      (topLeftCorner && board[y - 1][x - 1] === CellType.ship) ||
      (topRightCorner && board[y - 1][x + 1] === CellType.ship) ||
      (bottomLeftCorner && board[y + 1][x - 1] === CellType.ship) ||
      (bottomRightCorner && board[y + 1][x + 1] === CellType.ship)
    ) {
      type = null;
      break;
    }
  }

  return type;
};
