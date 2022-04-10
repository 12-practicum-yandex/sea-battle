import { ShipProps } from '@features/gameSea/types';

type ChangeTranslateShipType = ({
  ships,
  id,
  x,
  y,
}: {
  ships: ShipProps[];
  id: number;
  x: number;
  y: number;
}) => ShipProps[];

type ClearTranslateShipType = (ships: ShipProps[], id?: number) => ShipProps[];

// Изменение положения корабля при DND
export const changeTranslateShip: ChangeTranslateShipType = ({ ships, id, x, y }) => {
  return ships.map((item) => {
    const ship = JSON.parse(JSON.stringify(item));

    if (ship.id === id) {
      ship.translate.x += x;
      ship.translate.y += y;
    }

    return ship;
  });
};

// Очищение положения корабля при DND.
// id - если нужно удалить корабль из списка (успешно расположили корабль)
export const clearTranslateShip: ClearTranslateShipType = (ships, id) => {
  const shipsClone = ships.map((item) => JSON.parse(JSON.stringify(item)));

  if (typeof id === 'number') {
    const indexRemoved = shipsClone.findIndex((ship) => ship.id === id);
    shipsClone.splice(indexRemoved, 1);
    return shipsClone;
  } else {
    return shipsClone.map((ship) => {
      ship.translate.x = 0;
      ship.translate.y = 0;
      return ship;
    });
  }
};
