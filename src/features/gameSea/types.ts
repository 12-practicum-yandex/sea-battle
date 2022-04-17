import { CellType } from '@features/canvas/game-cell/types';

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
};

export type CellProps = {
  indexX: number;
  indexY: number;
  type?: CellType;
};
