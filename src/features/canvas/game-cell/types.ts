import { CellProps } from '@features/gameSea/types';

export enum CellType {
  'empty',
  'miss',
  'hit',
  'ship',
}

export type CellDrawProps = {
  ctx: CanvasRenderingContext2D;
  params: CellProps;
};
