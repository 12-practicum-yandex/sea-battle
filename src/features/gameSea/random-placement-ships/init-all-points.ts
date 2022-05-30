import { AllPointsType } from '@features/gameSea/random-placement-ships/algorithm-data';

export const initAllPoints = (): AllPointsType => {
  const board: { indexX: number; indexY: number }[] = [];

  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      board.push({ indexY: row, indexX: column });
    }
  }
  // Перемешиваем
  board.sort(() => Math.random() - 0.5);

  return board;
};
