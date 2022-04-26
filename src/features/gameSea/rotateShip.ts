import { PositionShip, ShipProps } from '@features/gameSea/types';

// Изменяем изменяем данные при перевороте корабля
export const rotateShip = (id: number, ships: ShipProps[]) => {
  const allShips: ShipProps[] = JSON.parse(JSON.stringify(ships));

  allShips.forEach((item) => {
    const position = item.settings.positionShip;
    const newPosition =
      position === PositionShip.horizontal ? PositionShip.vertical : PositionShip.horizontal;

    if (item.id === id) {
      item.settings.positionShip = newPosition;
    }
  });

  return allShips;
};
