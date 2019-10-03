import React, { Component } from "react";
import "./components/All.css";
import "./App.css";
import Game from "./containers/Game";
import Board from "./components/Board";
import PregameOptions from "./components/PregameOptions";
import { calculateWinner, checkIfGameIsOver } from "./helper/usefulFunctions";
import { minimax } from "./helper/minimax";
import styles from "./styles.js";
// import styled from 'styled-components';
import "typeface-roboto";
// import { makeStyles } from '@material-ui/core/styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      currentPlayer: "O",
      step: 0,
      playerOneName: "P1",
      playerTwoName: "P2",
      vsPC: true,
      noPointerEvents: "",
      gameStarts: !false
    };
  }

  handleClick = i => {
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    const currentPlayer = this.state.currentPlayer;
    const nextPlayer = currentPlayer === "O" ? "X" : "O";

    if (checkIfGameIsOver(currentSquares, i)) {
      return;
    }

    currentSquares[i] = currentPlayer === "O" ? "O" : "X";

    this.setState({
      history: history.concat([{ squares: currentSquares }]),
      currentPlayer: nextPlayer,
      step: step + 1
    });
    if (this.state.vsPC) {
      this.setState({ noPointerEvents: "no-pointer-events" });
      setTimeout(() => {
        this.computerMakesMove();
      }, 300);
    }
  };

  jumpTo = i => {
    this.setState({
      step: i,
      currentPlayer: i % 2 === 0 ? "X" : "O"
    });
  };

  changePlayerName = (e, playerName) => {
    this.setState({
      [playerName]: e.target.value
    });
  };

  startGame = e => {
    // no pointer events until this is clicked
    e.preventDefault();
    this.setState({ gameStarts: !this.state.gameStarts });
  };

  restartGame = () =>
    this.setState({ step: 0, history: [{ squares: Array(9).fill(null) }] });

  gameIsVsPC = vsBoolean => {
    this.setState({ vsPC: vsBoolean });
  };

  computerMakesMove = () => {
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    const currentPlayer = this.state.currentPlayer;
    const nextPlayer = currentPlayer === "O" ? "X" : "O";

    let moveIndex = minimax(currentSquares, currentPlayer).index;
    if (checkIfGameIsOver(currentSquares, moveIndex)) {
      return;
    }
    currentSquares[moveIndex] = this.state.currentPlayer === "O" ? "O" : "X";

    this.setState({
      history: history.concat([{ squares: currentSquares }]),
      currentPlayer: nextPlayer,
      step: step + 1,
      noPointerEvents: ""
    });
  };

  render() {
    const history = this.state.history;
    const currentSquares = history[history.length - 1].squares.slice();
    let currentPlayerName =
      this.state.currentPlayer === "O"
        ? this.state.playerOneName
        : this.state.playerTwoName;
    let status;
    const winner = calculateWinner(currentSquares);

    if (winner) {
      status = `Winner is ${currentPlayerName}!`;
    } else if (currentSquares.every(squares => squares)) {
      status = "Draw!";
    } else {
      status = `It's ${currentPlayerName}'s turn`;
    }

    // #353643 rgba(255, 255, 255, 0.70)

    return (
      <div
        className="App"
        // style={{
        //   height: "100vh",
        //   width: "100vw",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignContent: "center"
        // }}
      >
        <div className="Game">
          {this.state.gameStarts === true ? (
            <Game
              status={status}
              noPointerEvents={this.state.noPointerEvents}
              history={history}
              step={this.state.step}
              handleClick={this.handleClick}
              restartGame={this.restartGame}
              startGame={this.startGame}
              jumpTo={this.jumpTo}
            />
          ) : (
            <PregameOptions
              playerOneName={this.state.playerOneName}
              playerTwoName={this.state.playerTwoName}
              changePlayerName={this.changePlayerName}
              startGame={this.startGame}
              gameIsVsPC={this.gameIsVsPC}
              vsPC={this.state.vsPC}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
