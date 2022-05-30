import { GameType } from '@pages/game';
import { drawMissAfterDead, setTypesHitOrShip } from '@features/gameSea/setTypesCells';
import { CellType } from '@features/canvas/game-cell/types';
import { checkHitShip } from '@features/gameSea/checkHitShip';
import { CellProps, GameProps } from '@features/gameSea/types';
import {
  algorithm,
  LineAttackType,
  lineCellCoordinate,
  TypeFire,
} from '@features/gameSea/random-placement-ships/algorithm-data';
import { initAllPoints } from '@features/gameSea/random-placement-ships/init-all-points';
import { setStartPoint } from '@features/gameSea/random-placement-ships/set-start-point';

export const fireAlgorithm = (
  game: GameType,
  deadShipHandler: GameProps['callbackDeadShip'],
): GameType => {
  // Заполняем данные алгоритма, если не заполнены
  if (algorithm.allPoints.length === 0) {
    algorithm.allPoints = initAllPoints();
    algorithm.startPoint = setStartPoint();
  }

  const gameClone = JSON.parse(JSON.stringify(game));
  let ships = gameClone.ships;
  const board = gameClone.board;

  const { indexX, indexY } = getCell();

  // Проверка - можно ли нанести удар
  const typesCells = setTypesHitOrShip({ cells: [{ indexX, indexY }], board, isShip: false });

  if (typesCells !== null) {
    const cellFire = typesCells[0];

    // Если попали в корабль
    if (cellFire.type === CellType.hit) {
      // Обновляем данные попадания в корабль
      algorithm.typeFire = TypeFire.hitShip;
      algorithm.initialCell = { indexX: cellFire.indexX, indexY: cellFire.indexY };

      if (algorithm.firstInitialCell === null) {
        algorithm.firstInitialCell = { indexX: cellFire.indexX, indexY: cellFire.indexY };
      }

      const { shipsClone, deadShip } = checkHitShip(cellFire, ships); // Проверка на попадание корабля

      ships = shipsClone; // Обновляем hp кораблей

      board[cellFire.indexY][cellFire.indexX] = cellFire.type; // Если попали, то обновляем доску

      // Если потопили корабль
      if (deadShip !== null) {
        resetAfterDead();

        const cells = deadShip.isPositionCell;
        const cellAroundShip = drawMissAfterDead({ board, cells }); // Точки вокруг потопленного корабля

        // Очищаем исходные массивы и обновляем доску
        cellAroundShip.forEach((cell) => {
          removeCell({ x: cell.indexX, y: cell.indexY });
          board[cell.indexY][cell.indexX] = cell.type;
        });

        deadShipHandler(deadShip); // сообщить, что корабль потоплен
      }

      // выполняем еще 1 ход
      return fireAlgorithm({ board, ships }, deadShipHandler);
    } else {
      // Если промахнулись, то обновляем доску и удаляем исходные точки
      board[cellFire.indexY][cellFire.indexX] = cellFire.type;
      removeCell({ x: cellFire.indexX, y: cellFire.indexY });

      // Изменяем данные попадания в корабль (если до этого уже попадали)
      if (algorithm.initialCell !== null) {
        removeLineAttack(); // удаляем текущее направление
        algorithm.typeFire = TypeFire.simple;
      }
    }
  } else {
    // Если что-то пошло не так
    console.log(indexY, indexX, 'error');
  }

  return { ships, board };
};

const getCell = (): CellProps => {
  // переделать
  let x = 0,
    y = 0;

  // Если еще не попали в корабль и есть базовые точки для обстрела и нет попадания в корабль
  if (
    algorithm.typeFire === TypeFire.simple &&
    algorithm.startPoint.length !== 0 &&
    algorithm.initialCell === null
  ) {
    // Достаем последний элемент из массива
    const { indexY, indexX } = algorithm.startPoint[algorithm.startPoint.length - 1];
    x = indexX;
    y = indexY;
  }

  // Если еще не попали в корабль и нет базовых точек для обстрела и нет попадания в корабль
  if (
    algorithm.typeFire === TypeFire.simple &&
    algorithm.startPoint.length === 0 &&
    algorithm.initialCell === null
  ) {
    const { indexY, indexX } = algorithm.allPoints[algorithm.allPoints.length - 1];
    x = indexX;
    y = indexY;
  }

  // Если попали в корабль, но не потопили
  if (algorithm.initialCell !== null) {
    const liteAttack = getLineAttack(); // Выбираем линию атаки
    const { indexX, indexY } = lineCellCoordinate[liteAttack]; // Данные, для получения следующей ячейки

    // Если сделали удар (или несколько ударов) и затем промахнулись, то возвращаем к первой точке
    if (algorithm.typeFire === TypeFire.simple && algorithm.firstInitialCell !== null) {
      algorithm.initialCell = algorithm.firstInitialCell;
    }

    const nextX = algorithm.initialCell.indexX + indexX;
    const nextY = algorithm.initialCell.indexY + indexY;

    // Если выходим за пределы доски или в точку уже стреляли
    if (nextX < 0 || nextX > 9 || nextY < 0 || nextY > 9 || !isCheckEmptyCell(nextX, nextY)) {
      removeLineAttack();
      return getCell(); // Запускаем по новой
    }

    x = nextX;
    y = nextY;

    // Если попали в корабль в предыдущий ход, то обновляем точку попадания
    if (algorithm.typeFire === TypeFire.hitShip) {
      algorithm.initialCell.indexX = x;
      algorithm.initialCell.indexY = y;
    }
  }

  removeCell({ x, y });
  return { indexX: x, indexY: y, type: CellType.ship };
};

// Удаляем объекты из algorithm.startPoint и algorithm.allPoints (можно оптимизировать)
const removeCell = ({ x, y }: { x: number; y: number }) => {
  algorithm.startPoint.forEach((item, index, array) => {
    if (item.indexY === y && item.indexX === x) {
      array.splice(index, 1);
    }
  });

  algorithm.allPoints.forEach((item, index, array) => {
    if (item.indexY === y && item.indexX === x) {
      array.splice(index, 1);
    }
  });
};

const isCheckEmptyCell = (x: number, y: number) => {
  return (
    algorithm.allPoints.find((item) => {
      return item.indexX === x && item.indexY === y;
    }) !== undefined
  );
};

const getLineAttack = () => algorithm.lineAttack[0];

const removeLineAttack = (removedLine?: LineAttackType[]) => {
  if (!removedLine) {
    algorithm.lineAttack.shift();
  } else {
    removedLine.forEach((line, index) => {
      if (algorithm.lineAttack.find((lineAttack) => lineAttack === line)) {
        algorithm.lineAttack.splice(index, 1);
      }
    });
  }
};

const resetAfterDead = () => {
  algorithm.lineAttack = [
    LineAttackType.down,
    LineAttackType.up,
    LineAttackType.left,
    LineAttackType.right,
  ]; // восстанавливаем все направления
  algorithm.typeFire = TypeFire.simple;
  algorithm.initialCell = null; // удаляем точку попадания в корабль
  algorithm.firstInitialCell = null; // удаляем первую точку попадания в корабль
};
