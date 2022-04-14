import { useState, useEffect, useRef } from 'react';
import { GameSea } from '@features/gameSea';
import { initBoard } from './initBoard';
import { COUNT_CELL } from '@constants/game';
import { styled } from '@mui/material';
import { CellProps } from '@features/gameSea/types';
import { FullscreenButton } from '@components';
import { useFullscreen } from '@features/use-fullscreen';
import { AuthPageLayout } from '@layouts';

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
  const boardRef = useRef<HTMLElement>(null);
  const { isOpen, toggleFullscreen } = useFullscreen({ element: boardRef.current });

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
    <AuthPageLayout ref={boardRef}>
      <BoardContainer>
        {!!board && <GameSea board={board} callbackCellSelect={cellSelect} />}{' '}
        {!!board && <GameSea board={board} callbackCellSelect={cellSelect} />}
      </BoardContainer>
      <FullscreenButton onClick={toggleFullscreen} isOpen={isOpen} />
    </AuthPageLayout>
  );
};
