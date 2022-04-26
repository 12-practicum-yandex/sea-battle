import { CellProps, ShipProps } from '@features/gameSea/types';

type SuccessTranslateShipType = (
  ships: ShipProps[],
  id: number,
  typesCell: CellProps[] | null,
) => ShipProps[];

export const successTranslateShip: SuccessTranslateShipType = (ships, id, typesCell) => {
  const shipsClone = ships.map((item) => JSON.parse(JSON.stringify(item)));

  shipsClone.forEach((ship) => {
    if (ship.id === id) {
      ship.isPositionCell = typesCell;
    }
  });

  return shipsClone;
};
