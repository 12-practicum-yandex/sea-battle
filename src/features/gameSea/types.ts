import { CellType } from '@features/canvas/game-cell/types';
import { TypeGame } from '@pages/game';

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

export type CallbackCellSelect = (payload: CellProps[]) => void;
export type CallbackDeadShip = (deadShip: ShipProps) => void;

export type GameSeaProps = {
  board: number[][];
  callbackCellSelect: CallbackCellSelect;
  callbackDeadShip: CallbackDeadShip;
  showShip: boolean;
  readyGame: (isReady: boolean) => void;
};

export type CellProps = {
  indexX: number;
  indexY: number;
  type?: CellType;
};
