import { useCallback } from 'react';
import { IShip } from '@features/gameSea';

type Props = {
  data: IShip;
  isDragCallback: (ship: IShip) => void; // callback, передающая параметры корабля
};

export const Ship = ({ data, isDragCallback }: Props) => {
  const onMouseDownHandler = useCallback((e) => {
    if (e.nativeEvent.button === 0) {
      isDragCallback(data);
    }
  }, []);

  return (
    <div
      className="ship"
      style={{
        width: 50 * data.settings.countDeck,
        height: 50 * data.settings.countDeck,
        marginBottom: 10,
        background: '#000',
        transform: `translate(${data.translate.x}px, ${data.translate.y}px)`,
      }}
      onMouseDown={onMouseDownHandler}
    />
  );
};
