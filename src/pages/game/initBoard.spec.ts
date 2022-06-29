import { initBoard } from './initBoard';

describe('initBoard', () => {
  it('should generated matrix', () => {
    const SIZE = 10;
    expect(initBoard(SIZE)).toEqual(expect.arrayContaining([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]));
  });
});
