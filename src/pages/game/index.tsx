import { useState, useEffect } from 'react';
import { GameSea } from '@features/gameSea';
import { initBoard } from './initBoard';
import { COUNT_CELL } from '@constants/game';
import { styled } from '@mui/material';
import { GameSeaProps } from '@features/gameSea/types';

export enum TypeGame {
  'preparation',
  'battle',
}

const BoardContainer = styled('div')(() => ({
  display: 'flex',
}));

export const Game = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [board, setBoard] = useState<number[][] | null>(null);
  const [typeGame, setTypeGame] = useState<TypeGame>(TypeGame.preparation);

  // При клике по ячейке или переносе корабля возвращается массив index в матрице и тип ячеек
  const cellSelect: GameSeaProps['callbackCellSelect'] = (payload) => {
    if (board !== null) {
      const boardUpdateTypes = JSON.parse(JSON.stringify(board));

      payload.forEach((cell) => {
        boardUpdateTypes[cell.indexY][cell.indexX] = cell.type;
      });

      setBoard(boardUpdateTypes);
    }
  };

  const deadShipHandler: GameSeaProps['callbackDeadShip'] = (ship) => {
    console.log(ship, 'Поражен');
  };

  const readyGame = (isReady: boolean): void => {
    setIsReady(isReady);
  };

  const startGame = () => {
    setTypeGame(TypeGame.battle);
  };

  useEffect(() => {
    setBoard(initBoard(COUNT_CELL));
  }, []);

  return (
    <>
      <BoardContainer>
        {!!board && (
          <GameSea
            board={board}
            callbackCellSelect={cellSelect}
            callbackDeadShip={deadShipHandler}
            showShip={true}
            readyGame={readyGame}
          />
        )}
      </BoardContainer>
      <button onClick={startGame}>Начать игру</button>
    </>
  );
};
