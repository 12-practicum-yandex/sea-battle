import { callbackCellSelect } from '@pages/game';
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
};

export type GameSeaProps = {
  board: number[][];
  callbackCellSelect: callbackCellSelect;
};

export type CellProps = {
  indexX: number;
  indexY: number;
  type?: CellType;
};
