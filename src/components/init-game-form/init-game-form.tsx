import {
  Card,
  CardContent,
  styled,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { TInitGameFormValues } from './types';

const Content = styled(CardContent)`
  width: 400px;
`;

const defaultValues: TInitGameFormValues = {
  'first-player': '',
  'second-player': '',
  'game-variant': 'computer',
  'ships-draw-variant': 'random',
};

type Props = {
  onSubmit: (values: TInitGameFormValues) => void;
};

export const InitGameForm = ({ onSubmit }: Props) => {
  const { watch, setValue, register, handleSubmit } = useForm<TInitGameFormValues>({
    defaultValues,
  });

  const gameVariant = watch('game-variant');
  const shipsDrawVariant = watch('ships-draw-variant');
  const firstPlayer = watch('first-player');
  const secondPlayer = watch('second-player');

  const isSubmitDisabled = gameVariant === 'player' && (!firstPlayer || !secondPlayer);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Content>
          <Typography variant="h4">Настройки игры</Typography>

          <Box mb={3} />

          <Grid container spacing={2}>
            <Grid item>
              <Typography>Выберите вариант игры</Typography>
              <ToggleButtonGroup
                exclusive
                value={gameVariant}
                onChange={(_, value: TInitGameFormValues['game-variant']) =>
                  setValue('game-variant', value as never)
                }
              >
                <ToggleButton value="computer">Компьютер</ToggleButton>
                <ToggleButton value="player">Игрок</ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            {gameVariant === 'player' && (
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField {...register('first-player')} label="Первый игрок" />
                  </Grid>
                  <Grid item>
                    <TextField {...register('second-player')} label="Второй игрок" />
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid item>
              <Typography>Выберите вариант расстановки кораблей</Typography>
              <ToggleButtonGroup
                exclusive
                value={shipsDrawVariant}
                onChange={(_, value: TInitGameFormValues['ships-draw-variant']) =>
                  setValue('ships-draw-variant', value as never)
                }
              >
                <ToggleButton value="random">Случайная</ToggleButton>
                <ToggleButton value="manual">Ручная</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          <Box mb={2} />

          <Button size="large" variant="contained" type="submit" disabled={isSubmitDisabled}>
            Начать игру
          </Button>
        </Content>
      </Card>
    </form>
  );
};
