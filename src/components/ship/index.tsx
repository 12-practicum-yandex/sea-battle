import { useCallback } from 'react';
import { PositionShip, ShipProps } from '@features/gameSea/types';
import styled, { css } from 'styled-components';

type Props = {
  data: ShipProps;
  isDragCallback: (ship: ShipProps) => void; // callback, передающая параметры корабля
  changePositionShip: (id: number) => void; // callback, передающая параметры корабля
};

const ShipElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-right: 10px;
  background: #1e4676;
  user-select: none;
  ${(props: { width: number; height: number; transform: string }) => css`
    width: ${props.width}px;
    height: ${props.height}px;
    transform: ${props.transform};
  `}
`;

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
    <ShipElement
      className="ship"
      onMouseDown={onMouseDownHandler}
      width={
        data.settings.positionShip === PositionShip.horizontal ? 50 * data.settings.countDeck : 50
      }
      height={
        data.settings.positionShip === PositionShip.vertical ? 50 * data.settings.countDeck : 50
      }
      transform={`translate(${data.translate.x}px, ${data.translate.y}px)`}
    >
      <span onClick={() => changePositionShip(data.id)}>{data.id}</span>
    </ShipElement>
  );
};
