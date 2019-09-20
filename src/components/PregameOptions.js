import React from 'react';
import './All.css';

const PregameOptions = ({ playerOneName, playerTwoName, changePlayerName }) => {
  return (
    <form>
      <button type='button' name='gameMode' value='Human vs Computer'>
        Human vs Computer
      </button>
      <button type='button' name='gameMode' value='Human vs Human'>
        Human vs Human
      </button>
      {/* <div>
        <input
          type='radio'
          id='radio1'
          name='gameMode'
          value='Human vs Computer'
        >
          Huamss
        </input>
      </div> */}
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
