const ScoreBoard = ({score}) => {
    return(
        <div className='score-board'>
            <div className='score-board'>
                <h1>
                    Score
                </h1>
                <h3>
                    {score}
                </h3>
            </div>
            <div className='credits'>
                <h1>
                    Credits
                </h1>
                <h2>
                    Game Design
                </h2>
                <h3>
                    @CoachNooB
                </h3>
                <h2>
                    Music
                </h2>
                <h3>
                    @Horriblemach
                </h3>
            </div>
        </div>
    );
}

export default ScoreBoard;