import React, { useState } from 'react';
import './All.css';

const PregameOptions = ({
  startGame,
  gameIsVsPC,
  playerOneName,
  playerTwoName,
  changePlayerName
}) => {
  //   const usePlayer = player => {
  //     const [name, setName] = useState('');
  //     const onChange = e => {
  //       setName(e.target.value);
  //     };
  //     return {
  //       name,
  //       onChange
  //     };
  //   };
  //   const p1 = usePlayer();
  //   const p2 = usePlayer();

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
        Play:
        <label>
          <input type='radio' id='Xradio' name='XorO'></input>First
        </label>
        <label>
          <input type='radio' id='Oradio' name='XorO'></input>Second
        </label>
      </p>
      <p>P1 Name:</p>
      {/* <input value={p1.name} onChange={e => p1.onChange(e)}></input> */}
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
