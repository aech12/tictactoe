import React, { useState } from "react";
import Board from "../components/Board";
import { Button } from "@material-ui/core";
import "../App.css";

const Game = ({
  status,
  noPointerEvents,
  history,
  squares,
  step,
  handleClick,
  restartGame,
  startGame,
  jumpTo
}) => {
  const goToMove = history.map((d, index) => {
    let msg = `Turn #${index}`;
    return (
      <li key={index}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => jumpTo(index)}
        >
          {`${msg}`}
        </Button>
      </li>
    );
  });

  return (
    <div className="BoardScreen">
      <div className="leftside">
        <div className="status">{status}</div>
        <div className={`board ${noPointerEvents}`}>
          <Board squares={history[step].squares} onClick={handleClick} />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={restartGame}>
            Play Again
          </Button>
          <Button variant="contained" color="primary" onClick={startGame}>
            Change Settings
          </Button>
        </div>
      </div>

      <ul className="rightside">{goToMove}</ul>
    </div>
  );
};

export default Game;
