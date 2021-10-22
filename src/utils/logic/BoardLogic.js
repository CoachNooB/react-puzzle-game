import { PuzzlePieces } from './PiecesLogic';

const createBoard = (boardWidth) => {
    const board = [];
    for(let i = 0; i < boardWidth * boardWidth; i++) {
        board[i] = PuzzlePieces[Math.floor(Math.random() * PuzzlePieces.length)]
    };
    return board;
}

export { createBoard };