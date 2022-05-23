import { MouseEvent, useEffect, useRef, useState } from 'react';
import { CanvasContainer, GameContainer, Header, ShipsContainer } from './styled';
import { ALL_SHIP, COUNT_CELL } from '@constants/game';
import { Ship } from '@components/ship';
import { getIndexAndPositionCells } from '@features/gameSea/getIndexAndPositionCells';
import { successTranslateShip } from '@features/gameSea/translateShip';
import { drawBoard, drawCells } from '@features/gameSea/drawElement';
import { drawMissAfterDead, setTypesHitOrShip } from '@features/gameSea/setTypesCells';
import { CellProps, IGame, ShipProps, TypeGame } from '@features/gameSea/types';
import { rotateShip } from '@features/gameSea/rotateShip';
import { CellType } from '@features/canvas/game-cell/types';
import { Button } from '@mui/material';
import { checkHitShip } from '@features/gameSea/checkHitShip';
import { initBoard } from '@pages/game/initBoard';

export const GameSea = ({
  board,
  ships,
  callbackShips,
  isMe,
  callbackDeadShip,
  settings,
  typeGame,
  callbackBoard,
  isMeStep,
}: IGame) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [dragShip, setDragShip] = useState<ShipProps | null>(null);

  // Расставить корабли заново
  const resetShip = () => {
    const canvas = canvasRef.current;

    if (canvas !== null && board.length > 0) {
      drawBoard(canvas, board, true);
      callbackShips(ALL_SHIP, isMe);
      callbackBoard(initBoard(COUNT_CELL), isMe);
    }
  };

  const mouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (dragShip !== null) {
      const dragShipUpdate = {
        ...dragShip,
        translate: {
          x: dragShip.translate.x + e.movementX,
          y: dragShip.translate.y + e.movementY,
        },
      };

      setDragShip(dragShipUpdate);
    }
  };

  // Отправляем измененную доску родителю
  // cellType - пока что только miss, для передачи хода
  const callbackBoardHandler = (cells: CellProps[], cellType?: CellType) => {
    const boardUpdate = JSON.parse(JSON.stringify(board));

    cells.forEach((cell) => {
      boardUpdate[cell.indexY][cell.indexX] = cell.type;
    });

    callbackBoard(boardUpdate, isMe, cellType);
  };

  const onMouseUpHandler = async (e: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    const isShip = dragShip !== null; // Перемещается ли в данный момент корабль

    if (canvas !== null) {
      const ctx = canvas.getContext('2d');
      const cells = getIndexAndPositionCells(e, canvas, dragShip); // Проверка выхода за пределы поля (при клике или перемещения корабля)
      const typesCells = setTypesHitOrShip({ cells, board, isShip }); // Проверка - можно ли расположить корабль или нанести удар

      // Если расположили корабль
      if (isShip && typesCells !== null && settings.translateShip) {
        callbackShips(successTranslateShip(ships, dragShip.id, typesCells), isMe); // Отправляем изменения родителю
        callbackBoardHandler(typesCells);
        drawCells({ ctx, typesCell: typesCells }); // Перерисовываем ячейки
      }

      // Если попали по кораблю
      if (typesCells !== null && typesCells[0].type === CellType.hit && settings.isClickCell) {
        let cellAroundShip: CellProps[] = []; // Ячейки при потоплении корабля
        const { shipsClone, deadShip } = checkHitShip(typesCells[0], ships);
        await callbackShips(shipsClone, isMe); // Отправляем изменения родителю

        // Убили какой-то корабль
        if (deadShip !== null) {
          const cells = deadShip.isPositionCell;
          cellAroundShip = drawMissAfterDead({ board, cells, ctx });
          await callbackDeadShip(deadShip);
        }

        callbackBoardHandler(typesCells.concat(cellAroundShip));
        drawCells({ ctx, typesCell: typesCells }); // Перерисовываем ячейки
      }

      // Если промахнулись
      if (typesCells !== null && typesCells[0].type === CellType.miss && settings.isClickCell) {
        callbackBoardHandler(typesCells, CellType.miss);
        drawCells({ ctx, typesCell: typesCells }); // Перерисовываем ячейки
      }

      setDragShip(null); // Обнуляем данные перетаскиваемого корабля
    }
  };

  // Если перетаскиваем за пределы поля, то возвращаем корабль на прежнее место
  const onMouseLeaveHandler = () => {
    setDragShip(null);
  };

  const setDragShipHandler = (ship: ShipProps): void => {
    setDragShip(ship);
  };

  const rotateShipHandler = (id: number) => {
    const allShips = rotateShip(id, ships);
    callbackShips(allShips, isMe); // Отправили изменения родителю
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas !== null && board !== null) {
      drawBoard(canvas, board, false, settings.showShip);
    }
  }, [isMeStep, board]);

  return (
    <GameContainer>
      <Header>
        <span>{isMe ? 'Вы' : 'Противник'}</span>
        {typeGame === TypeGame.preparation && (
          <Button variant="outlined" style={{ marginLeft: 10 }} onClick={resetShip}>
            Расставить корабли заново
          </Button>
        )}
      </Header>
      <CanvasContainer
        onMouseMove={mouseMoveHandler}
        onMouseUp={onMouseUpHandler}
        onMouseLeave={onMouseLeaveHandler}
        ref={boardRef}
      >
        <canvas ref={canvasRef} />

        {typeGame === TypeGame.preparation && (
          <ShipsContainer>
            {ships.map(
              (item) =>
                item.isPositionCell === null && (
                  <Ship
                    key={item.id}
                    data={item}
                    isDragCallback={setDragShipHandler}
                    rotateShip={rotateShipHandler}
                    dragShip={dragShip}
                  />
                ),
            )}
          </ShipsContainer>
        )}
      </CanvasContainer>
    </GameContainer>
  );
};
