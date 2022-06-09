// Массивы базовых координат для обстрела
const startPoint = [
  [
    [6, 0],
    [2, 0],
    [0, 2],
    [0, 6],
  ],
  [
    [3, 0],
    [7, 0],
    [9, 2],
    [9, 6],
  ],
];

export const setStartPoint = () => {
  const res = [];

  let x, y;

  // получаем координаты для обстрела по диагонали вправо-вниз
  for (const arr of startPoint[0]) {
    x = arr[0];
    y = arr[1];
    while (x <= 9 && y <= 9) {
      res.push({ indexX: x, indexY: y });
      x = x <= 9 ? x : 9;
      y = y <= 9 ? y : 9;
      x++;
      y++;
    }
  }

  // получаем координаты для обстрела по диагонали вправо-вверх
  for (const arr of startPoint[1]) {
    x = arr[0];
    y = arr[1];
    while (x >= 0 && x <= 9 && y <= 9) {
      res.push({ indexX: x, indexY: y });
      x = x >= 0 && x <= 9 ? x : x < 0 ? 0 : 9;
      y = y <= 9 ? y : 9;
      x--;
      y++;
    }
  }

  res.sort(() => Math.random() - 0.5);

  return res;
};
