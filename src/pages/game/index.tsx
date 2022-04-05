import { useState, useEffect } from 'react';
import { GameSea } from '@features/gameSea';
import { initBoard } from './initBoard';
import { CellType } from '@features/canvas/game-cell/types';

export type callbackCellSelect = ({
  indexX,
  indexY,
}: {
  indexX: number;
  indexY: number;
  type: CellType;
}) => void;

export enum TypeGame {
  'preparation',
  'battle',
}

export const Game = () => {
  const [board, setBoard] = useState<number[][] | null>(null);
  const [typeGame, setTypeGame] = useState<TypeGame>(TypeGame.preparation);

  // При клике по ячейке или переносе корабля возвращается index в матрице и тип ячейки
  const cellSelect: callbackCellSelect = ({ indexX, indexY, type }) => {
    // indexY - строка в board
    // indexX - ячейка в строке
    console.log(indexY, indexX, type);
  };

  useEffect(() => {
    setBoard(initBoard(10));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {!!board && <GameSea board={board} callbackCellSelect={cellSelect} />}{' '}
      {!!board && <GameSea board={board} callbackCellSelect={cellSelect} />}
    </div>
  );
};
