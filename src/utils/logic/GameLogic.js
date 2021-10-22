import { PuzzlePieces } from './PiecesLogic';
import BlankPieces from '../images/Blank-256.png'

const checkMatchFiveColumn = (boardWidth, currentPuzzle, setScore, play) => {
    for(let i = 0; i <= 31; i++) {
        const match = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3, i + boardWidth * 4];
        const tokenToCheck = currentPuzzle[i];
        
        if(match.every(item => currentPuzzle[item] === tokenToCheck)) {
            play()
            setScore(score => score + 25);
            match.forEach(item => currentPuzzle[item] = BlankPieces);
            return true;
        }
    }
}

const checkMatchFourColumn = (boardWidth, currentPuzzle, setScore, play) => {
    for(let i = 0; i <= 39; i++) {
        const match = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3];
        const tokenToCheck = currentPuzzle[i];
        
        if(match.every(item => currentPuzzle[item] === tokenToCheck)) {
            play()
            setScore(score => score + 20);
            match.forEach(item => currentPuzzle[item] = BlankPieces);
            return true;
        }
    }
}

const checkMatchThreeColumn = (boardWidth, currentPuzzle, setScore, play) => {
    for(let i = 0; i <= 47; i++) {
        const match = [i, i + boardWidth, i + boardWidth * 2];
        const tokenToCheck = currentPuzzle[i];
        
        if(match.every(item => currentPuzzle[item] === tokenToCheck)) {
            play()
            setScore(score => score + 15);
            match.forEach(item => currentPuzzle[item] = BlankPieces);
            return true;
        }
    }
}

const checkMatchFiveRow = (currentPuzzle, setScore, play) => {
    for(let i = 0; i < 64; i++) {
        const notvalid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63];
        const match = [i, i + 1, i + 2, i + 3, i + 4];
        const tokenToCheck = currentPuzzle[i];

        if(notvalid.includes(i)) continue
        
        if(match.every(item => currentPuzzle[item] === tokenToCheck)) {
            play()
            setScore(score => score + 25);
            match.forEach(item => currentPuzzle[item] = BlankPieces);
            return true;
        }
    }
}

const checkMatchFourRow = (currentPuzzle, setScore, play) => {
    for(let i = 0; i < 64; i++) {
        const notvalid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
        const match = [i, i + 1, i + 2, i + 3];
        const tokenToCheck = currentPuzzle[i];
        
        if(notvalid.includes(i)) continue
        
        if(match.every(item => currentPuzzle[item] === tokenToCheck)) {
            play()
            setScore(score => score + 20);
            match.forEach(item => currentPuzzle[item] = BlankPieces);
            return true;
        }
    }
}

const checkMatchThreeRow = (currentPuzzle, setScore, play) => {
    for(let i = 0; i < 64; i++) {
        const notvalid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
        const match = [i, i + 1, i + 2];
        const tokenToCheck = currentPuzzle[i];

        if(notvalid.includes(i)) continue
        
        if(match.every(item => currentPuzzle[item] === tokenToCheck)) {
            play()
            setScore(score => score + 15);
            match.forEach(item => currentPuzzle[item] = BlankPieces);
            return true;
        }
    }
}

const moveTokenDown = (boardWidth, currentPuzzle) => {
    for(let i = 0; i <= 55; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);

        if(isFirstRow && currentPuzzle[i] === BlankPieces) {
            currentPuzzle[i] = PuzzlePieces[Math.floor(Math.random() * PuzzlePieces.length)]
        }
        
        if((currentPuzzle[i + boardWidth]) === BlankPieces) {
            currentPuzzle[i + boardWidth] = currentPuzzle[i];
            currentPuzzle[i] = BlankPieces;
        }
    }
}

const dragStart = (e, setActionToken) => {
    setActionToken(e.target);
}

const dragTarget = (e, setTargetToken) => {
    setTargetToken(e.target);
}

const dragEnd = (boardWidth, currentPuzzle, setCurrentPuzzle, actionToken, setActionToken, targetToken, setTargetToken, setScore, play) => {
    if(!targetToken) return;
    const actionId = parseInt(actionToken.getAttribute('data-id'));
    const targetId = parseInt(targetToken.getAttribute('data-id'));
    const leftSideId = [0, 8, 16, 24, 32, 40, 48, 56];
    const rightSideId = [7, 15, 23, 31, 39, 47, 55, 63];
    let validMoves = [actionId - 1, actionId - boardWidth, actionId + 1, actionId + boardWidth];
    
    currentPuzzle[targetId] = actionToken.getAttribute('src');
    currentPuzzle[actionId] = targetToken.getAttribute('src');

    const isMatchFiveColumn = checkMatchFiveColumn(boardWidth, currentPuzzle, setScore, play);
    const isMatchFourColumn = checkMatchFourColumn(boardWidth, currentPuzzle, setScore, play);
    const isMatchThreeColumn = checkMatchThreeColumn(boardWidth, currentPuzzle, setScore, play);
    const isMatchFiveRow = checkMatchFiveRow(currentPuzzle, setScore, play);
    const isMatchFourRow = checkMatchFourRow(currentPuzzle, setScore, play);
    const isMatchThreeRow = checkMatchThreeRow(currentPuzzle, setScore, play);

    if(leftSideId.includes(actionId)) {
        validMoves = [actionId - boardWidth, actionId + 1, actionId + boardWidth];
    }

    if(rightSideId.includes(actionId)) {
        validMoves = [actionId - boardWidth, actionId - 1, actionId + boardWidth];
    }
    
    if(targetId && validMoves.includes(targetId) &&
        (isMatchFiveColumn || isMatchFiveRow || isMatchFourColumn || isMatchFourRow || isMatchThreeColumn || isMatchThreeRow)
    ) {
        setActionToken(null);
        setTargetToken(null);

    } else {
        currentPuzzle[targetId] = targetToken.getAttribute('src');
        currentPuzzle[actionId] = actionToken.getAttribute('src');
        setCurrentPuzzle([...currentPuzzle]);
    }
}

export { checkMatchThreeColumn, checkMatchFourColumn, checkMatchFiveColumn, checkMatchThreeRow, checkMatchFourRow, checkMatchFiveRow, moveTokenDown, dragStart, dragTarget, dragEnd }