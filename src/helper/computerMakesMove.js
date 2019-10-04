// import { calculateWinner, checkIfGameIsOver } from "./helper/usefulFunctions";
import { minimax } from "./minimax";

function computerMakesMove(step, history, currentSquares, currentPlayer) {
  let moveIndex = minimax(currentSquares, currentPlayer).index;
  // if (checkIfGameIsOver(currentSquares, moveIndex)) {
  //   return;
  // }
  currentSquares[moveIndex] = currentPlayer === "O" ? "O" : "X";

  return {
    history: history.concat([{ squares: currentSquares }]),
    step: step + 1
  };
}

export { computerMakesMove };
