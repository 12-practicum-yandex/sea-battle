import { memo, useCallback } from 'react';
import { PositionShip, ShipProps } from '@features/gameSea/types';
import { styled } from '@mui/material';

type Props = {
  data: ShipProps;
  isDragCallback: (ship: ShipProps) => void; // callback, передающая параметры корабля
  changePositionShip: (id: number) => void; // callback, передающая параметры корабля
};

const ShipComponent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
  marginRight: 10,
  background: '#1e4676',
  userSelect: 'none',
}));

export const Ship = memo(({ data, isDragCallback, changePositionShip }: Props) => {
  const onMouseDownHandler = useCallback(
    (e) => {
      if (e.nativeEvent.button === 0) {
        isDragCallback(data);
      }
    },
    [data],
  );

  const positionShipHandler = useCallback(() => {
    changePositionShip(data.id);
  }, [data]);

  return (
    <ShipComponent
      className="ship"
      onMouseDown={onMouseDownHandler}
      sx={{
        width:
          data.settings.positionShip === PositionShip.horizontal
            ? 50 * data.settings.countDeck
            : 50,
        height:
          data.settings.positionShip === PositionShip.vertical ? 50 * data.settings.countDeck : 50,
        transform: `translate(${data.translate.x}px, ${data.translate.y}px)`,
      }}
    >
      <span onClick={positionShipHandler}>{data.id}</span>
    </ShipComponent>
  );
});
