import { ShipProps, PositionShip } from '@features/gameSea/types';

export const COUNT_CELL = 10; // Количество ячеек
export const DEFAULT_SIZE_CELL = 50; // px одной ячейки

export const ALL_SHIP: ShipProps[] = [
  {
    id: 1,
    settings: { countDeck: 1, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 1,
    isPositionCell: null,
  },
  {
    id: 2,
    settings: { countDeck: 1, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 1,
    isPositionCell: null,
  },
  {
    id: 3,
    settings: { countDeck: 1, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 1,
    isPositionCell: null,
  },
  {
    id: 4,
    settings: { countDeck: 1, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 1,
    isPositionCell: null,
  },

  {
    id: 5,
    settings: { countDeck: 2, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 2,
    isPositionCell: null,
  },
  {
    id: 6,
    settings: { countDeck: 2, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 2,
    isPositionCell: null,
  },
  {
    id: 7,
    settings: { countDeck: 2, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 2,
    isPositionCell: null,
  },
  {
    id: 8,
    settings: { countDeck: 3, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 3,
    isPositionCell: null,
  },
  {
    id: 9,
    settings: { countDeck: 3, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 3,
    isPositionCell: null,
  },
  {
    id: 10,
    settings: { countDeck: 4, positionShip: PositionShip.horizontal },
    translate: { x: 0, y: 0 },
    hp: 4,
    isPositionCell: null,
  },
];
