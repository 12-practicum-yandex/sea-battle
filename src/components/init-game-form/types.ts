type TGameVariant = 'player' | 'computer';
type TShipsDrawVariant = 'random' | 'manual';

export type TInitGameFormValues = {
  'first-player': string;
  'second-player': string;
  'game-variant': TGameVariant;
  'ships-draw-variant': TShipsDrawVariant;
};

export type TInitGameNames = keyof TInitGameFormValues;
