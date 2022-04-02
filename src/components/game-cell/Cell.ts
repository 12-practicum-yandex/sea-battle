import { paramsCellProps } from './types';

export class Cell {
  x: paramsCellProps['x'];
  y: paramsCellProps['y'];
  size: paramsCellProps['size'];
  type: paramsCellProps['type'];

  constructor({ x, y, size = 50, type }: paramsCellProps) {
    this.x = x;
    this.y = y;
    this.size = size || 50;
    this.type = type;
  }

  public clear(ctx: CanvasRenderingContext2D) {
    const { x, y, size = 50 } = this;
    ctx.clearRect(x, y, size, size);
  }

  public drawType(ctx: CanvasRenderingContext2D) {
    switch (this.type) {
      case 0: {
        this._draw(ctx);
        break;
      }
      case 1: {
        this._drawMissing(ctx);
        break;
      }
      case 2: {
        this._drawHit(ctx);
        break;
      }
      case 3: {
        this._drawShip(ctx);
        break;
      }
    }
  }

  private _drawHit(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(x + size / 2, y + size / 2, size / 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    this._draw(ctx);
  }

  private _drawShip(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;

    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.closePath();
  }

  private _drawMissing(ctx: CanvasRenderingContext2D) {
    const { x, y, size } = this;

    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    this._draw(ctx);
  }

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
