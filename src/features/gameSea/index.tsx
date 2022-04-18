import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from '@mui/material';
import { redrawCell } from '@features/canvas/game-cell';
import { ALL_SHIP } from '@constants/game';
import { Ship } from '@components/ship';
import { getIndexAndPositionCells } from '@features/gameSea/getIndexAndPositionCells';
import { successTranslateShip } from '@features/gameSea/translateShip';
import { drawBoard } from '@features/gameSea/drawBoard';
import { drawMissAfterDead, setTypesHitOrShip } from '@features/gameSea/setTypesCells';
import { CellProps, GameSeaProps, ShipProps } from '@features/gameSea/types';
import { changePositionShip } from '@features/gameSea/changePositionShip';
import { checkHitShip } from '@features/gameSea/checkHitShip';
import { CellType } from '@features/canvas/game-cell/types';

const CanvasContainer = styled('div')(() => ({
  display: 'flex',
  width: 'min-content',
  paddingRight: 20,
  maxHeight: 500,
}));

const ShipsContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: 330,
}));

type SetCellHandlerType = ({
  typesCell,
  ctx,
  deadShip,
}: {
  typesCell: CellProps[];
  ctx: CanvasRenderingContext2D;
  deadShip: ShipProps | null;
}) => void;

export const GameSea = ({
  board,
  callbackCellSelect,
  callbackDeadShip,
  showShip,
  readyGame,
}: GameSeaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [dragShip, setDragShip] = useState<ShipProps | null>(null);
  const [ships, setShips] = useState<ShipProps[] | []>([]);

  // Передаем информацию родителю и делаем отрисовку
  const setCellHandler: SetCellHandlerType = ({ typesCell, ctx, deadShip }) => {
    if (deadShip !== null) {
      callbackDeadShip(deadShip);
    }

    callbackCellSelect(typesCell);

    typesCell.forEach((cell) => {
      if (!(!showShip && cell.type === CellType.ship)) {
        redrawCell({
          ctx,
          params: {
            indexX: cell.indexX,
            indexY: cell.indexY,
            type: cell.type,
          },
        });
      }
    });
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

  const updateCellAfterDead = (deadShip: ShipProps, ctx: CanvasRenderingContext2D) => {
    const cells = deadShip.isPositionCell;
    if (cells !== null) {
      const cellsAroundShip = drawMissAfterDead({ board, cells, ctx });
      callbackCellSelect(cellsAroundShip);
    }
  };

  const onMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;

    if (canvas !== null) {
      let deadShipItem = null;
      const ctx = canvas.getContext('2d');
      const cells = getIndexAndPositionCells(e, canvas, dragShip); // Проверка выхода за пределы поля
      const typesCell = setTypesHitOrShip({ cells, board, isShip: dragShip !== null }); // Проверка - можно ли расположить корабль или нанести удар

      if (ctx !== null && typesCell !== null) {
        if (typesCell.length === 1 && typesCell[0].type === CellType.hit) {
          const { shipsClone, deadShip } = checkHitShip(typesCell[0], ships);
          setShips(shipsClone);

          if (deadShip !== null) {
            deadShipItem = deadShip;
            updateCellAfterDead(deadShip, ctx);
          }
        }

        setCellHandler({ ctx, typesCell, deadShip: deadShipItem });

        if (dragShip !== null) {
          setShips(successTranslateShip(ships, dragShip.id, typesCell));
          setDragShip(null);
          return;
        }
      }

      setDragShip(null);
    }
  };

  // Если перетаскиваем за пределы поля, то возвращаем корабль на прежнее место
  const onMouseLeaveHandler = () => {
    setDragShip(null);
  };

  const setDragShipHandler = (ship: ShipProps): void => {
    setDragShip(ship);
  };

  const changePositionShipHandler = (id: number) => {
    const allShips = changePositionShip(id, ships);
    setShips(allShips);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas !== null && board.length > 0) {
      drawBoard(canvas, board);
    }

    setShips(ALL_SHIP);
  }, []);

  useMemo(() => {
    if (isReady) {
      readyGame(true);
    }
  }, [isReady]);

  // useEffect(() => {
  //   const test = ships.filter((ship) => ship.isPositionCell === null);
  //   console.log(test);
  //   if (test.length === 0) {
  //     setIsReady(true);
  //   }
  // }, [ships]);

  return (
    <CanvasContainer
      onMouseMove={mouseMoveHandler}
      onMouseUp={onMouseUpHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={boardRef}
    >
      <canvas ref={canvasRef} />

      <ShipsContainer className="ships">
        {ships.map(
          (item) =>
            item.isPositionCell === null && (
              <Ship
                key={item.id}
                data={item}
                isDragCallback={setDragShipHandler}
                changePositionShip={changePositionShipHandler}
                dragShip={dragShip}
              />
            ),
        )}
      </ShipsContainer>
    </CanvasContainer>
  );
};
