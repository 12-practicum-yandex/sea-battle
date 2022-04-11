import { ShipProps } from '@features/gameSea/types';

type SuccessTranslateShipType = (ships: ShipProps[], id: number) => ShipProps[];

// id - если нужно удалить корабль из списка (успешно расположили корабль)
export const successTranslateShip: SuccessTranslateShipType = (ships, id) => {
  const shipsClone = ships.map((item) => JSON.parse(JSON.stringify(item)));

  const indexRemoved = shipsClone.findIndex((ship) => ship.id === id);
  shipsClone.splice(indexRemoved, 1);

  return shipsClone;
};
