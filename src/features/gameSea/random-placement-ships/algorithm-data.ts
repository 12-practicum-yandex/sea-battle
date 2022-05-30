export enum TypeFire {
  simple, // Если еще не попали по кораблю
  hitShip, // Если попали по кораблю и необходимо стрелять по линии атаки
}

// Линии атаки
export enum LineAttackType {
  up,
  down,
  left,
  right,
}

export type AllPointsType = { indexX: number; indexY: number }[];

export type AlgorithmType = {
  initialCell: { indexX: number; indexY: number } | null;
  firstInitialCell: { indexX: number; indexY: number } | null;
  typeFire: TypeFire;
  lineAttack: LineAttackType[];
  startPoint: { indexX: number; indexY: number }[];
  allPoints: AllPointsType;
};

export const lineCellCoordinate: Record<LineAttackType, { indexX: number; indexY: number }> = {
  [LineAttackType.up]: { indexX: 0, indexY: -1 },
  [LineAttackType.down]: { indexX: 0, indexY: 1 },
  [LineAttackType.right]: { indexX: 1, indexY: 0 },
  [LineAttackType.left]: { indexX: -1, indexY: 0 },
};

export const algorithm: AlgorithmType = {
  initialCell: null, // Координаты точки попадания
  firstInitialCell: null, // Координаты точки первого попадания
  typeFire: TypeFire.simple, // Текущий тип стрельбы
  lineAttack: [LineAttackType.down, LineAttackType.up, LineAttackType.left, LineAttackType.right],
  startPoint: [], // Массивы базовых координат для обстрела
  allPoints: [], // Все точки доски
};
