export enum InitGameNames {
  GameVariant = 'game-variant',
  ShipsDrawVariant = 'ships-draw-variant',
  FirstPlayer = 'first-player',
  SecondPlayer = 'second-player',
}

type TGameVariant = 'player' | 'computer';
type TGameDrawVariant = 'random' | 'manual';

export type TInitGameFormValues = {
  [InitGameNames.FirstPlayer]: string;
  [InitGameNames.SecondPlayer]: string;
  [InitGameNames.GameVariant]: TGameVariant;
  [InitGameNames.ShipsDrawVariant]: TGameDrawVariant;
};
