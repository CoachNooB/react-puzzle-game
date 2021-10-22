import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

const App = () => {
  const [ scoreDisplay, setScoreDisplay ] = useState(0);

  return (
    <div className="App">
      <h2>Element Crush</h2>
      <div className='main-display'>
        <GameBoard setScoreDisplay={setScoreDisplay} />
        <ScoreBoard score={scoreDisplay} />
      </div>
    </div>
  );
}

export default App;
