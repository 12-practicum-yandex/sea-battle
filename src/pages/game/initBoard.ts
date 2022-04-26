export const initBoard = (size: number) => {
  const board: number[][] = [];

  for (let row = 0; row < size; row++) {
    board.push([]); //row
    for (let column = 0; column < size; column++) {
      board[row].push(0);
    }
  }

  return board;
};
