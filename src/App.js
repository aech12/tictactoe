import React, { Component } from 'react';
import './components/All.css';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      nextPlayer: 'X',
      step: 0
    };
  }

  handleClick = i => {
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    checkIfGameIsOver(currentSquares, i);

    if (this.state.nextPlayer === 'O') {
      currentSquares[i] = 'X';
    } else {
      currentSquares[i] = 'O';
    }
    this.setState({
      history: history.concat([{ squares: currentSquares }]),
      nextPlayer: currentSquares[i],
      step: step + 1
    });
  };
  jumpTo = i => {
    this.setState({
      step: i,
      nextPlayer: i % 2 === 0 ? 'X' : 'O'
    });
  };

  render() {
    const history = this.state.history;
    const currentSquares = history[history.length - 1].squares.slice();
    let status;

    const winner = calculateWinner(currentSquares);
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player is: ${this.state.nextPlayer}`;
    }
    // set state with handleClick in Board instead of here for extra challenge
    const goToMove = history.map((d, index) => {
      let msg = index ? `Go to move: #${index}` : `Go to game start`;
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{`${msg}`}</button>
        </li>
      );
    });

    return (
      <div className='game'>
        <div className='leftside'>
          <div className='status'>{status}</div>
          <div className='board'>
            <Board
              squares={history[this.state.step].squares}
              onClick={this.handleClick}
            />
          </div>
        </div>
        <ul>{goToMove}</ul>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
const checkIfGameIsOver = (currentSquares, i) => {
  if (calculateWinner(currentSquares) || currentSquares[i]) {
    return;
  }
};

export default App;
