import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { createBoard } from '../utils/logic/BoardLogic';
import {
    checkMatchThreeColumn,
    checkMatchFourColumn,
    checkMatchFiveColumn,
    checkMatchThreeRow,
    checkMatchFourRow,
    checkMatchFiveRow,
    moveTokenDown,
    dragStart,
    dragTarget,
    dragEnd,
} from '../utils/logic/GameLogic';
import BGM from '../utils/music/Lofi3.mp3';
import tokenSound from '../utils/music/rising-pops.mp3'

export const GameBoard = ({setScoreDisplay}) => {
    const boardWidth = 8;
    const [currentPuzzle, setCurrentPuzzle] = useState([]);
    const [actionToken, setActionToken] = useState(null);
    const [targetToken, setTargetToken] = useState(null);
    const [score, setScore] = useState(0);

    const [play] = useSound(tokenSound, {
        volume: 0.5,
    });
    const [playBGM] = useSound(BGM, {
        autoplay: true,
        loop: true,
        volume: 0.25,
        onend: () => playBGM(),
    });

    useEffect(() => {
        setCurrentPuzzle(createBoard(boardWidth));
        playBGM();
        //eslint-disable-next-line
    },[]);

    useEffect(() => {
        const timer = setInterval(() => {
            moveTokenDown(boardWidth, currentPuzzle);
            checkMatchFiveColumn(boardWidth, currentPuzzle, setScore, play);
            checkMatchFiveRow(currentPuzzle, setScore, play);
            checkMatchFourColumn(boardWidth, currentPuzzle, setScore, play);
            checkMatchFourRow(currentPuzzle, setScore, play);
            checkMatchThreeColumn(boardWidth, currentPuzzle, setScore, play);
            checkMatchThreeRow(currentPuzzle, setScore, play);
            setScoreDisplay(score);
            setCurrentPuzzle([...currentPuzzle]);
        }, 200)

        return () => clearInterval(timer)
    }, [currentPuzzle, score, setScoreDisplay, play])
    

    return (
        <div className='game-board'>
            {
                currentPuzzle.map((pieces, index) => {
                    return(
                        <img 
                            key={index}
                            src={pieces}
                            alt={pieces}
                            data-id={index}
                            draggable={true}
                            onDragStart={e => dragStart(e, setActionToken)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            onDrop={e => dragTarget(e, setTargetToken)}
                            onDragEnd={e => dragEnd(boardWidth, currentPuzzle, setCurrentPuzzle, actionToken, setActionToken, targetToken, setTargetToken, setScore, play)}
                        />
                    )
                })
            }
        </div>
    )
}
