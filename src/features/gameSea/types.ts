import { CellType } from '@features/canvas/game-cell/types';
import { CallbackBoardType, CallbackShipsType } from '@pages/game';

export enum TypeGame {
  'preparation',
  'battle',
}

export enum PositionShip {
  'vertical',
  'horizontal',
}

export type ShipProps = {
  id: number;
  settings: {
    countDeck: number;
    positionShip: number;
  };
  translate: {
    x: number;
    y: number;
  };
  hp: number;
  isPositionCell: null | CellProps[];
};

export type GameProps = {
  board: BoardType;
  ships: ShipProps[];
  callbackBoard: CallbackBoardType;
  callbackShips: CallbackShipsType;
  callbackDeadShip: (deadShip: ShipProps) => void;
  typeGame: TypeGame | null;
  isMe: boolean;
};

export interface IGame extends GameProps {
  settings: {
    translateShip: boolean;
    isClickCell: boolean;
    showShip: boolean;
  };
}

export type CellProps = {
  indexX: number;
  indexY: number;
  type?: CellType;
};

export type BoardType = CellType[][];
