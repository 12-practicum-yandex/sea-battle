import { memo, useCallback } from 'react';
import { PositionShip, ShipProps } from '@features/gameSea/types';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { IconButton, styled } from '@mui/material';

type Props = {
  dragShip: ShipProps | null;
  data: ShipProps;
  isDragCallback: (ship: ShipProps) => void; // callback, передающая параметры корабля
  rotateShip: (id: number) => void; // callback, передающая параметры корабля
};

const ShipComponent = styled('div')(
  ({ drag, ship }: { drag: ShipProps | null; ship: ShipProps }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
    userSelect: 'none',
    background: '#1e4676',
    width:
      ship.settings.positionShip === PositionShip.horizontal ? 50 * ship.settings.countDeck : 50,
    height:
      ship.settings.positionShip === PositionShip.vertical ? 50 * ship.settings.countDeck : 50,
    transform:
      drag !== null && drag.id === ship.id
        ? `translate(${drag.translate.x}px, ${drag.translate.y}px)`
        : `translate(${0}px, ${0}px)`,
  }),
);

const ShipContainer = styled('div')(() => ({
  flex: `1 0 25%`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Ship = memo(({ data, isDragCallback, rotateShip, dragShip }: Props) => {
  const onMouseDownHandler = useCallback(
    (e) => {
      if (e.nativeEvent.button === 0) {
        isDragCallback(data);
      }
    },
    [data],
  );

  const positionShipHandler = useCallback(() => {
    rotateShip(data.id);
  }, [data]);

  return (
    <ShipContainer>
      <ShipComponent className="ship" onMouseDown={onMouseDownHandler} drag={dragShip} ship={data}>
        {data.settings.countDeck !== 1 && (
          <IconButton onClick={positionShipHandler}>
            <RotateLeftIcon style={{ color: '#fff' }} />
          </IconButton>
        )}
      </ShipComponent>
    </ShipContainer>
  );
});
