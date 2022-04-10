import { useState, useEffect } from 'react';
import { GameSea } from '@features/gameSea';
import { initBoard } from './initBoard';
import { COUNT_CELL } from '@constants/game';
import { styled } from '@mui/material';
import { CellProps } from '@features/gameSea/types';

export type callbackCellSelect = (payload: CellProps[]) => void;

export enum TypeGame {
  'preparation',
  'battle',
}

const BoardContainer = styled('div')(() => ({
  display: 'flex',
}));

export const Game = () => {
  const [board, setBoard] = useState<number[][] | null>(null);
  const [typeGame, setTypeGame] = useState<TypeGame>(TypeGame.preparation);

  // При клике по ячейке или переносе корабля возвращается массив index в матрице и тип ячеек
  const cellSelect: callbackCellSelect = (payload) => {
    if (board !== null) {
      const boardUpdateTypes = JSON.parse(JSON.stringify(board));

      payload.forEach((cell) => {
        boardUpdateTypes[cell.indexY][cell.indexX] = cell.type;
      });

      setBoard(boardUpdateTypes);
    }
  };

  useEffect(() => {
    setBoard(initBoard(COUNT_CELL));
  }, []);

  return (
    <BoardContainer>
      {!!board && <GameSea board={board} callbackCellSelect={cellSelect} />}{' '}
      {!!board && <GameSea board={board} callbackCellSelect={cellSelect} />}
    </BoardContainer>
  );
};
