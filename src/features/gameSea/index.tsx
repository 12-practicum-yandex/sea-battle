import { MouseEvent, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material';
import { redrawCell } from '@features/canvas/game-cell';
import { ALL_SHIP } from '@constants/game';
import { Ship } from '@components/ship';
import { getIndexAndPositionCells } from '@features/gameSea/getIndexAndPositionCells';
import { successTranslateShip } from '@features/gameSea/translateShip';
import { drawBoard } from '@features/gameSea/drawBoard';
import { setTypesCells } from '@features/gameSea/setTypesCells';
import { CellProps, GameSeaProps, ShipProps } from '@features/gameSea/types';
import { changePositionShip } from '@features/gameSea/changePositionShip';

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
}: {
  typesCell: CellProps[];
  ctx: CanvasRenderingContext2D;
}) => void;

export const GameSea = ({ board, callbackCellSelect }: GameSeaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [dragShip, setDragShip] = useState<ShipProps | null>(null);
  const [ships, setShips] = useState<ShipProps[] | []>([]);

  // Передаем информацию родителю и делаем отрисовку
  const setCellHandler: SetCellHandlerType = ({ typesCell, ctx }) => {
    callbackCellSelect(typesCell);

    typesCell.forEach((cell) => {
      redrawCell({
        ctx,
        params: {
          indexX: cell.indexX,
          indexY: cell.indexY,
          type: cell.type,
        },
      });
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

  const onMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;

    if (canvas !== null) {
      const ctx = canvas.getContext('2d');
      const cells = getIndexAndPositionCells(e, canvas, dragShip); // Проверка выхода за пределы поля
      const typesCell = setTypesCells({ cells, board, isShip: dragShip !== null }); // Проверка - можно ли расположить корабль или нанести удар

      if (ctx !== null && typesCell !== null) {
        setCellHandler({ ctx, typesCell });

        if (dragShip !== null) {
          setShips(successTranslateShip(ships, dragShip.id));
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

  return (
    <CanvasContainer
      onMouseMove={mouseMoveHandler}
      onMouseUp={onMouseUpHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={boardRef}
    >
      <canvas ref={canvasRef} />

      <ShipsContainer className="ships">
        {ships.map((item) => (
          <Ship
            key={item.id}
            data={item}
            isDragCallback={setDragShipHandler}
            changePositionShip={changePositionShipHandler}
            dragShip={dragShip}
          />
        ))}
      </ShipsContainer>
    </CanvasContainer>
  );
};
