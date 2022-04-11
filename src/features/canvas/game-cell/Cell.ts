import { CellDrawProps, CellType } from './types';
import { DEFAULT_SIZE_CELL } from '@constants/game';

export class Cell {
  x: number;
  y: number;
  type: CellDrawProps['params']['type'];
  size: number;

  constructor({ indexX, indexY, type }: CellDrawProps['params']) {
    this.x = indexX * DEFAULT_SIZE_CELL;
    this.y = indexY * DEFAULT_SIZE_CELL;
    this.size = DEFAULT_SIZE_CELL;
    this.type = type;
  }

  // Получаем координаты начала и размер для конкретной ячейки и очищаем это ячейку
  public clear(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;
    ctx.clearRect(x, y, size, size);
  }

  // Отрисовка типа клетки (пустая, с кораблем и т.д.)
  public drawType(ctx: CanvasRenderingContext2D) {
    switch (this.type) {
      case CellType.empty: {
        this._draw(ctx);
        break;
      }
      case CellType.miss: {
        this._drawMissing(ctx);
        break;
      }
      case CellType.hit: {
        this._drawHit(ctx);
        break;
      }
      case CellType.ship: {
        this._drawShip(ctx);
        break;
      }
    }
  }

  // Отрисовка клетки, если враг попал
  private _drawHit(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;
    this._drawShip(ctx);
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(x + size / 2, y + size / 2, size / 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    this._draw(ctx);
  }

  // Отрисовка клетки c кораблем
  private _drawShip(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;

    ctx.beginPath();
    ctx.fillStyle = '#1e4676';
    ctx.fillRect(x, y, size, size);
    ctx.closePath();
  }

  // Отрисовка клетки, если враг не попал
  private _drawMissing(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;

    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    this._draw(ctx);
  }

  // Отрисовка обычной клетки
  private _draw(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;
    const WIDTH_LINE = size / 4;

    ctx.beginPath();
    ctx.strokeStyle = '#1E4676';
    ctx.lineWidth = 2;

    ctx.rect(x, y, size, size);

    // Top left
    ctx.moveTo(x + WIDTH_LINE, y - 1);
    ctx.lineTo(x - 1, y - 1);
    ctx.lineTo(x - 1, y + WIDTH_LINE);

    ctx.moveTo(x + WIDTH_LINE, y + 1);
    ctx.lineTo(x + 1, y + 1);
    ctx.lineTo(x + 1, y + WIDTH_LINE);

    // Bottom left
    ctx.moveTo(x + WIDTH_LINE, y + size + 1);
    ctx.lineTo(x - 1, y + size + 1);
    ctx.lineTo(x - 1, y + size - WIDTH_LINE);

    ctx.moveTo(x + WIDTH_LINE, y + size - 1);
    ctx.lineTo(x + 1, y + size - 1);
    ctx.lineTo(x + 1, y + size - WIDTH_LINE);

    // Top right
    ctx.moveTo(x + size - WIDTH_LINE, y - 1);
    ctx.lineTo(x + size + 1, y - 1);
    ctx.lineTo(x + size + 1, y + WIDTH_LINE);

    ctx.moveTo(x + size - WIDTH_LINE, y + 1);
    ctx.lineTo(x + size - 1, y + 1);
    ctx.lineTo(x + size - 1, y + WIDTH_LINE);

    // Bottom right
    ctx.moveTo(x + size - WIDTH_LINE, y + size - 1);
    ctx.lineTo(x + size - 1, y + size - 1);
    ctx.lineTo(x + size - 1, y + size - WIDTH_LINE);

    ctx.moveTo(x + size - WIDTH_LINE, y + size + 1);
    ctx.lineTo(x + size + 1, y + size + 1);
    ctx.lineTo(x + size + 1, y + size - WIDTH_LINE);

    ctx.stroke();
    ctx.closePath();
  }
}
