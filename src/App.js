import React, { Component } from 'react';
import './components/All.css';
import Board from './components/Board';
import PregameOptions from './components/PregameOptions';
import { calculateWinner, checkIfGameIsOver } from './helper/usefulFunctions';
import { minimax } from './helper/minimax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      currentPlayer: 'O',
      step: 0,
      playerOneName: 'P1',
      playerTwoName: 'P2',
      vsPC: true,
      noPointerEvents: '',
      gameStarts: false
    };
  }

  handleClick = i => {
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    const currentPlayer = this.state.currentPlayer;
    const nextPlayer = currentPlayer === 'O' ? 'X' : 'O';

    if (checkIfGameIsOver(currentSquares, i)) {
      return;
    }

    currentSquares[i] = currentPlayer === 'O' ? 'O' : 'X';

    this.setState({
      history: history.concat([{ squares: currentSquares }]),
      currentPlayer: nextPlayer,
      step: step + 1
    });
    if (this.state.vsPC) {
      this.setState({ noPointerEvents: 'no-pointer-events' });
      setTimeout(() => {
        this.computerMakesMove();
      }, 300);
    }
  };

  jumpTo = i => {
    this.setState({
      step: i,
      currentPlayer: i % 2 === 0 ? 'X' : 'O'
    });
  };

  changePlayerName = (e, playerName) => {
    this.setState({
      [playerName]: e.target.value
    });
  };

  startGame = () => {
    // no pointer events until this is clicked
    this.setState({ gameStarts: !this.state.gameStarts });
  };

  restartGame = () =>
    this.setState({ step: 0, history: [{ squares: Array(9).fill(null) }] });

  gameIsVsPC = vsPC => {
    vsPC = this.state.vsPC;
    if (vsPC) {
      this.setState({ vsPC });
    } else {
      this.setState({ vsPC });
    }
  };

  computerMakesMove = () => {
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    const currentPlayer = this.state.currentPlayer;
    const nextPlayer = currentPlayer === 'O' ? 'X' : 'O';

    if (checkIfGameIsOver(currentSquares, moveIndex)) {
      return;
    }
    let moveIndex = minimax(currentSquares, currentPlayer).index;
    console.log(moveIndex);
    currentSquares[moveIndex] = this.state.currentPlayer === 'O' ? 'O' : 'X';

    this.setState({
      history: history.concat([{ squares: currentSquares }]),
      currentPlayer: nextPlayer,
      step: step + 1,
      noPointerEvents: ''
    });
  };

  render() {
    const history = this.state.history;
    const currentSquares = history[history.length - 1].squares.slice();
    let currentPlayerName =
      this.state.currentPlayer === 'O'
        ? this.state.playerOneName
        : this.state.playerTwoName;
    let status;
    const winner = calculateWinner(currentSquares);

    if (winner) {
      status = `Winner is ${currentPlayerName}!`;
    } else if (currentSquares.every(squares => squares)) {
      status = 'Draw!';
    } else {
      status = `It's ${currentPlayerName}'s turn`;
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
        {this.state.gameStarts === true ? (
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
            <div>
              <button onClick={this.restartGame}>Play Again</button>
              <button onClick={this.startGame}>Change Settings</button>
            </div>
            <ul>{goToMove}</ul>
          </div>
        ) : (
          <PregameOptions
            playerOneName={this.state.playerOneName}
            playerTwoName={this.state.playerTwoName}
            changePlayerName={this.changePlayerName}
            startGame={this.startGame}
            gameIsVsPC={this.gameIsVsPC}
          />
        )}
      </div>
    );
  }
}

export default App;
