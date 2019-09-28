import React, { Component } from 'react';
import './components/All.css';
import Board from './components/Board';
import PregameOptions from './components/PregameOptions';
import {
  calculateWinner,
  checkIfGameIsOver,
  pickRandomMoveFromCalculatedMoves
} from './helper/usefulFunctions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      nextPlayer: 'X',
      step: 0,
      playerOneName: 'Player One',
      playerTwoName: 'Player Two',
      vsPC: true,
      noPointerEvents: ''
    };
  }

  handleClick = i => {
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    const nextPlayer = this.state.nextPlayer;

    if (checkIfGameIsOver(currentSquares, i)) {
      return;
    }

    if (nextPlayer === 'O') {
      currentSquares[i] = 'X';
    } else {
      currentSquares[i] = 'O';
    }
    this.setState({
      history: history.concat([{ squares: currentSquares }]),
      nextPlayer: currentSquares[i],
      step: step + 1
    });
    if (this.state.vsPC) {
      this.setState({ noPointerEvents: 'no-pointer-events' });
    }
    setTimeout(() => {
      this.computerMove();
    }, 1000);
  };

  jumpTo = i => {
    this.setState({
      step: i,
      nextPlayer: i % 2 === 0 ? 'X' : 'O'
    });
  };

  changePlayerName = (e, playerName) => {
    this.setState({
      [playerName]: e.target.value
    });
  };

  startGame = () => {
    // no pointer events until this is clicked
  };

  restartGame = () =>
    this.setState({ step: 0, history: [{ squares: Array(9).fill(null) }] });

  gameIsVsPC = vsPC => this.setState({ vsPC });

  computerMove = () => {
    // return;
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    const nextPlayer = this.state.nextPlayer;

    let moveIndex = pickRandomMoveFromCalculatedMoves(
      currentSquares,
      nextPlayer
    );
    if (checkIfGameIsOver(currentSquares, moveIndex)) {
      return;
    }
    currentSquares[moveIndex] = this.state.nextPlayer === 'O' ? 'X' : 'O';

    this.setState({
      history: history.concat([{ squares: currentSquares }]),
      nextPlayer: currentSquares[moveIndex],
      step: step + 1,
      noPointerEvents: ''
    });
  };

  render() {
    const history = this.state.history;
    const currentSquares = history[history.length - 1].squares.slice();
    let currentPlayer =
      this.state.nextPlayer === 'X'
        ? this.state.playerOneName
        : this.state.playerTwoName;
    let status;

    const winner = calculateWinner(currentSquares);
    if (winner) {
      status = `Winner is ${currentPlayer}!`;
    } else {
      status = `It's ${currentPlayer}'s turn`;
    }
    const goToMove = history.map((d, index) => {
      let msg = `Turn #${index}`;
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{`${msg}`}</button>
        </li>
      );
    });

    return (
      <div className='game'>
        <div>
          <PregameOptions
            playerOneName={this.state.playerOneName}
            playerTwoName={this.state.playerTwoName}
            changePlayerName={this.changePlayerName}
            startGame={this.startGame}
            gameIsVsPC={this.gameIsVsPC}
          />
        </div>
        <div className=''>
          <div className='leftside'>
            <div className='status'>{status}</div>
            <div className={`board ${this.state.noPointerEvents}`}>
              <Board
                squares={history[this.state.step].squares}
                onClick={this.handleClick}
              />
            </div>
          </div>
        </div>
        <button onClick={this.restartGame}>Play Again</button>
        <ul>{goToMove}</ul>
      </div>
    );
  }
}

export default App;
