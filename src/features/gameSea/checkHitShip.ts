import { CellProps, ShipProps } from '@features/gameSea/types';

type CheckHipShipType = (
  hitCell: CellProps,
  ships: ShipProps[],
) => { shipsClone: ShipProps[]; deadShip: ShipProps | null };

// Проверяем попадание в корабль (если попали, то отнимаем 1 hp)
export const checkHitShip: CheckHipShipType = (hitCell, ships) => {
  let deadShip = null;
  const shipsClone = JSON.parse(JSON.stringify(ships));

  shipsClone.forEach((ship: ShipProps) => {
    const { isPositionCell } = ship;

    if (isPositionCell !== null) {
      const checkShipHit = isPositionCell.some(
        (cellShip) => cellShip.indexX === hitCell.indexX && cellShip.indexY === hitCell.indexY,
      );

      if (checkShipHit) {
        ship.hp -= 1;
      }

      if (checkShipHit && ship.hp <= 0) {
        deadShip = ship;
      }
    }
  });

  return { shipsClone, deadShip };
};
