import React from 'react';
import './All.css';

const PregameOptions = ({
  playerOneName,
  playerTwoName,
  changePlayerName,
  startGame,
  gameIsVsPC
}) => {
  return (
    <form onSubmit={startGame}>
      <label>
        <input
          type='radio'
          onClick={() => gameIsVsPC(true)}
          id='HvCradio'
          name='gameMode'
        ></input>
        Human vs Computer
      </label>
      <label>
        <input
          type='radio'
          onClick={() => gameIsVsPC(false)}
          id='HvHradio'
          name='gameMode'
        ></input>
        Human vs Human
      </label>
      <p>
        Play as:
        <label>
          <input type='radio' id='Xradio' name='XorO'></input>X
        </label>
        <label>
          <input type='radio' id='Oradio' name='XorO'></input>O
        </label>
      </p>
      <p>P1 Name:</p>
      <input
        value={playerOneName}
        onChange={e => changePlayerName(e, 'playerOneName')}
      ></input>
      <p>P2 Name:</p>
      <input
        value={playerTwoName}
        onChange={e => changePlayerName(e, 'playerTwoName')}
      />
      {/* Human vs Computer Human vs Human
      P1 Name: Player One
      P2 Name: Player Two class='disable-me' ->pointer-events:none */}
      <button type='submit'>Start</button>
    </form>
  );
};

export default PregameOptions;
