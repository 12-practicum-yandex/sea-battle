import { useCallback } from 'react';
import { PositionShip, ShipProps } from '@features/gameSea/types';

type Props = {
  data: ShipProps;
  isDragCallback: (ship: ShipProps) => void; // callback, передающая параметры корабля
  changePositionShip: (id: number) => void; // callback, передающая параметры корабля
};

export const Ship = ({ data, isDragCallback, changePositionShip }: Props) => {
  const onMouseDownHandler = useCallback(
    (e) => {
      if (e.nativeEvent.button === 0) {
        isDragCallback(data);
      }
    },
    [data],
  );

  return (
    <div
      className="ship"
      onMouseDown={onMouseDownHandler}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginRight: 10,
        background: '#1e4676',
        userSelect: 'none',
        width:
          data.settings.positionShip === PositionShip.horizontal
            ? 50 * data.settings.countDeck
            : 50,

        height:
          data.settings.positionShip === PositionShip.vertical ? 50 * data.settings.countDeck : 50,

        transform: `translate(${data.translate.x}px, ${data.translate.y}px)`,
      }}
    >
      <span onClick={() => changePositionShip(data.id)}>{data.id}</span>
    </div>
  );
};
