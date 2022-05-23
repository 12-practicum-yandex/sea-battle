import { useEffect, useState, useRef, useCallback } from 'react';
import { initBoard } from './initBoard';
import { ALL_SHIP, COUNT_CELL } from '@constants/game';
import { BoardType, GameProps, ShipProps, TypeGame } from '@features/gameSea/types';
import { GameSettings } from '@features/gameSea/hooks/GameSettings';
import { Header } from '@components';
import { BoardsWrapper, GameWrapper } from '@pages/game/styles';
import { Footer } from '@pages/game/Footer';
import { CellType } from '@features/canvas/game-cell/types';
import { randomPlacementShips } from '@features/gameSea/random-placement-ships';
import { ILeaderboardItem, TEAM_NAME, useAddToLeaderboardMutation } from '@api/leaderboard';
import { useGetUserQuery } from '@api/auth';
import { useNotification } from '@features/use-notification';

export type GameType = { board: BoardType | null; ships: ShipProps[] };
export type CallbackBoardType = (board: BoardType, isMeBoard: boolean, cellType?: CellType) => void;
export type CallbackShipsType = (ships: ShipProps[], isMeShips: boolean) => void;

export const Game = () => {
  const { createNotification } = useNotification();
  const [isMeStep, setIsMeStep] = useState<boolean>(true);
  const [myGame, setMyGame] = useState<GameType>({ board: null, ships: [] }); // Данные для нашей игры
  const [enemyGame, setEnemyGame] = useState<GameType>({ board: null, ships: [] }); // Данные для игры соперника
  const [typeGame, setTypeGame] = useState<TypeGame | null>(null);
  const { data: userData } = useGetUserQuery();

  const sootCounterRef = useRef(0);
  const isMyWin = useRef(false);
  const [addToLeaderboard] = useAddToLeaderboardMutation();

  const sendWinnerData = useCallback(() => {
    // сколько всего здоровья у кораблей
    const hpCounter = ALL_SHIP.reduce((acc, { hp }) => acc + hp, 0);
    // Число попадений
    const hitCounter = hpCounter;
    // Число промахов
    const missCounter = sootCounterRef.current - hpCounter;

    // За попадение даем 3 очка, за промах отнимем одно
    const score = hitCounter * 4 - missCounter;
    addToLeaderboard({
      data: {
        ...userData,
        score,
      } as ILeaderboardItem,
      ratingFieldName: 'score',
      teamName: TEAM_NAME,
    });
  }, [userData]);

  // Возвращает матрицу после любых изменений (попадание по кораблю, расстановка кораблей и т.д.)
  const callbackBoard: CallbackBoardType = (board, isMeBoard, cellType) => {
    // Передача хода
    if (cellType === CellType.miss) {
      setIsMeStep((prev) => !prev);
    }

    if (isMeBoard) {
      setMyGame((prev) => ({ ...prev, board }));
    } else {
      sootCounterRef.current++;
      setEnemyGame((prev) => ({ ...prev, board }));
    }
  };

  // Возвращает все корабли любых изменений
  const callbackShips: CallbackShipsType = (ships, isMeShips) => {
    if (isMeShips) {
      setMyGame((prev) => ({ ...prev, ships }));
    } else {
      setEnemyGame((prev) => ({ ...prev, ships }));
    }
  };

  const deadShipHandler: GameProps['callbackDeadShip'] = (ship) => {
    console.log(ship, 'Поражен');
  };

  const startGameHandler = () => {
    setTypeGame(TypeGame.preparation);
    isMyWin.current = false;
  };

  const startBattleHandler = () => {
    const myShips = myGame.ships.filter((ship) => ship.isPositionCell !== null);

    // Я расставил корабли. Теперь расставляет противник (робот)
    if (myShips.length === 10) {
      const enemyGameRandom = randomPlacementShips(enemyGame);

      if (enemyGameRandom !== null) {
        setEnemyGame(enemyGameRandom);
        setTypeGame(TypeGame.battle);
      }
    }
  };

  const placementShipsHandler = () => {
    const myGameRandom = randomPlacementShips(myGame);
    if (myGameRandom !== null) setMyGame(myGameRandom);
  };

  useEffect(() => {
    setMyGame((prev) => ({ ...prev, ships: ALL_SHIP, board: initBoard(COUNT_CELL) }));
    setEnemyGame((prev) => ({ ...prev, ships: ALL_SHIP, board: initBoard(COUNT_CELL) }));
  }, []);

  useEffect(() => {
    const enemyWin = myGame.ships.filter((ship) => ship.hp === 0).length === 10;
    const myWin = enemyGame.ships.filter((ship) => ship.hp === 0).length === 10;

    if (myWin && !isMyWin.current) {
      sendWinnerData();
      createNotification('Вы победили');
      isMyWin.current = true;
    }
    if (enemyWin) {
      createNotification('Вы проиграли');
    }
  }, [myGame, enemyGame]);

  return (
    <GameWrapper>
      <Header />
      <span>{isMeStep ? 'Ваш ход' : 'Ход противника'}</span>
      <BoardsWrapper>
        {myGame.board !== null && (
          <GameSettings
            board={myGame.board}
            ships={myGame.ships}
            callbackShips={callbackShips}
            callbackBoard={callbackBoard}
            callbackDeadShip={deadShipHandler}
            typeGame={typeGame}
            isMe={true}
            isMeStep={isMeStep}
          />
        )}
        {enemyGame.board !== null &&
          typeGame !== null && ( // typeGame === TypeGame.battle
            <GameSettings
              board={enemyGame.board}
              ships={enemyGame.ships}
              callbackShips={callbackShips}
              callbackBoard={callbackBoard}
              callbackDeadShip={deadShipHandler}
              typeGame={typeGame}
              isMe={false}
              isMeStep={!isMeStep}
            />
          )}
      </BoardsWrapper>
      <Footer
        type={typeGame}
        startGame={startGameHandler}
        startBattle={startBattleHandler}
        placementShipsHandler={placementShipsHandler}
        isMeStep={isMeStep}
      />
    </GameWrapper>
  );
};
