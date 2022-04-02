import React from 'react';
import { GameSea } from '../../features/gameSea';
import { initBoard } from './initBoard';

export type callbackCellSelect = ({ indexX, indexY }: { indexX: number; indexY: number }) => void;

export const Game = () => {
  const [board, setBoard] = React.useState<number[][] | null>(null);

  const cellSelect: callbackCellSelect = ({ indexX, indexY }) => {
    // indexY - строка в board
    // indexX - ячейка в строке
    // console.log(indexY, indexX);
  };

  React.useEffect(() => {
    setBoard(initBoard(10));
  }, []);

  return <>{!!board && <GameSea board={board} callbackCellSelect={cellSelect} />}</>;
};
