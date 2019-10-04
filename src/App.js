import React, { Component } from "react";
import "./components/All.css";
import "./App.css";
import Game from "./containers/Game";
import PregameOptions from "./components/PregameOptions";
import { calculateWinner, checkIfGameIsOver } from "./helper/usefulFunctions";
// import { minimax } from "./helper/minimax";
import "typeface-roboto";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { computerMakesMove } from "./helper/computerMakesMove";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#353643" }
  }
});

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
      this.setState({ noPointerEvents: "none" });
    }
  };

  jumpTo = i => {
    this.setState({
      step: i,
      currentPlayer: i % 2 === 0 ? "O" : "X"
    });
  };

  changePlayerName = (e, playerName) => {
    this.setState({
      [playerName]: e.target.value
    });
  };

  startGame = e => {
    e.preventDefault();
    this.setState({ gameStarts: !this.state.gameStarts });
  };

  restartGame = () =>
    this.setState({ step: 0, history: [{ squares: Array(9).fill(null) }] });

  gameIsVsPC = vsBoolean => {
    this.setState({ vsPC: vsBoolean });
  };

  setNewStateWithComputerMove = (history, step) => {
    setTimeout(() => {
      this.setState({
        history,
        currentPlayer: this.state.currentPlayer === "O" ? "X" : "O",
        step,
        noPointerEvents: ""
      });
    }, 1000);
  };

  render() {
    const step = this.state.step;
    const history = this.state.history.slice(0, step + 1);
    const currentSquares = history[history.length - 1].squares.slice();
    let currentPlayer = this.state.currentPlayer;
    let currentPlayerName =
      currentPlayer === "O"
        ? this.state.playerOneName
        : this.state.playerTwoName;
    let nextPlayer =
      currentPlayer === "X"
        ? this.state.playerOneName
        : this.state.playerTwoName;
    let status;
    const winner = calculateWinner(currentSquares);

    if (winner) {
      status = `Winner is ${nextPlayer}!`;
    } else if (currentSquares.every(squares => squares)) {
      status = "Draw!";
    } else {
      status = `It's ${currentPlayerName}'s turn`;
    }

    if (currentPlayer === "X") {
      const computerMadeMove = computerMakesMove(
        step,
        history,
        currentSquares,
        currentPlayer
      );
      this.setNewStateWithComputerMove(
        computerMadeMove.history,
        computerMadeMove.step
      );
    }

    // #353643 rgba(255, 255, 255, 0.70)

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <div
            className="Game"
            style={{ pointerEvents: `${this.state.noPointerEvents}` }}
          >
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
                className="PregameOptions"
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
      </ThemeProvider>
    );
  }
}

export default App;
