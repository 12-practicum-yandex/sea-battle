import { GameSea } from '@features/gameSea';
import { BoardContainer } from '../styled';
import { GameProps, TypeGame } from '@features/gameSea/types';
import { useMemo, useState } from 'react';

export const GameSettings = ({ ...props }: GameProps) => {
  const { isMe, typeGame } = props;
  const [settings, setSettings] = useState({
    isClickCell: false,
    translateShip: false,
    showShip: false,
  });

  useMemo(() => {
    setSettings({
      isClickCell: !isMe && typeGame === TypeGame.battle,
      translateShip: typeGame === TypeGame.preparation, // isMe && typeGame === TypeGame.preparation (пока что оставил для теста)
      showShip: isMe && typeGame === TypeGame.preparation,
    });
  }, [typeGame]);

  return (
    <BoardContainer>
      <GameSea {...props} settings={settings} />
    </BoardContainer>
  );
};
