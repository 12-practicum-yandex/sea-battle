import { GameSea } from '@features/gameSea';
import { BoardContainer } from '../styled';
import { GameProps, TypeGame } from '@features/gameSea/types';
import { useMemo, useState } from 'react';

export const GameSettings = ({ ...props }: GameProps) => {
  const { isMe, typeGame, isMeStep } = props; // isMe - мое поле (false - враг); isMeStep - мой ход
  const [settings, setSettings] = useState({
    isClickCell: false,
    translateShip: false,
    showShip: false,
  });

  useMemo(() => {
    const isClickCell = (!isMe && !isMeStep) || (isMe && !isMeStep);
    const isShowShip = (isMe && isMeStep) || (!isMe && isMeStep);

    setSettings({
      isClickCell: isClickCell && typeGame === TypeGame.battle, // Можно ли нанести удар
      translateShip: typeGame === TypeGame.preparation, // Можно ли перемещать корабль
      showShip: isShowShip, // Отображение расстановки кораблей
    });
  }, [typeGame, isMeStep]);

  if ((typeGame === TypeGame.preparation && isMeStep) || typeGame === TypeGame.battle) {
    return (
      <BoardContainer>
        <GameSea {...props} settings={settings} />
      </BoardContainer>
    );
  } else {
    return null;
  }
};
