import { Button } from '@mui/material';
import { TypeGame } from '@features/gameSea/types';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { FooterComponent } from '@pages/game/styles';

type FooterProps = {
  type: TypeGame | null;
  startGame: () => void;
  startBattle: () => void;
  placementShipsHandler: () => void;
  isMeStep: boolean;
};

export const Footer = ({
  type,
  startGame,
  startBattle,
  placementShipsHandler,
  isMeStep,
}: FooterProps) => {
  return (
    <FooterComponent>
      {type === null && (
        <Button variant="contained" onClick={startGame} startIcon={<PlayArrowIcon />}>
          Начать игру
        </Button>
      )}
      {type === TypeGame.preparation && (
        <>
          <Button variant="contained" onClick={startBattle} style={{ marginRight: 15 }}>
            Закончить расстановку кораблей
          </Button>
          {/*{errStart && <span>Закончите расстановку кораблей</span>}*/}
        </>
      )}
      {isMeStep && type === TypeGame.preparation && (
        <Button variant="outlined" onClick={placementShipsHandler} style={{ marginRight: 15 }}>
          Случайная расстановка кораблей
        </Button>
      )}
    </FooterComponent>
  );
};
