import { calculateWinner } from './usefulFunctions';

function isGameOver(squares, depth) {
  let winner = calculateWinner(squares);
  let depthIsPair = depth % 2 === 0;

  if (winner) {
    if (!depthIsPair) {
      return { value: -10 + Number(depth) };
    } else if (depthIsPair) {
      return { value: 10 - Number(depth) };
    }
  } else if (squares.every(square => square)) {
    return { value: 0 };
  } else if (depth === 0 && squares.every(square => square === undefined)) {
    return { value: 0, index: Math.floor(Math.random() * 9) };
  }
}

function minimax(squares, currentPlayer, depth = 0) {
  let gameIsOver = isGameOver(squares, depth);
  if (gameIsOver) {
    return gameIsOver;
  }

  const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
  const moves = [];

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      let newSquares = [...squares];
      newSquares[i] = currentPlayer;

      let value = minimax(newSquares, nextPlayer, depth + 1).value;

      let score = { value, index: i };
      moves.push({ ...score });
    }
    // else if (i === 8 && squares.every(square=> square)) {
    //   return {value: 0, index: i}
    // }

    if (i === 8) {
      if (depth % 2 === 0) {
        let bestMoves = squaresWithLowestScores(moves);
        let move = getRandomMove(bestMoves);
        return move;
      } else if (!depth % 2 === 0) {
        let bestMoves = squaresWithHighestScores(moves);
        let move = getRandomMove(bestMoves);
        return move;
      }
    }
  }
}

const squaresWithHighestScores = moves => {
  let movesWithHigestScore = [];
  let bestMove = { value: -Infinity, index: 0 };

  for (let move of moves) {
    if (move.value > bestMove.value) {
      bestMove = move;
      movesWithHigestScore = [{ ...bestMove }];
    } else if (move.value === bestMove.value) {
      movesWithHigestScore.push(move);
    }
  }
  return movesWithHigestScore;
};
const squaresWithLowestScores = moves => {
  let movesWithLowestScore = [];
  let bestMove = { value: Infinity, index: 0 };

  for (let move of moves) {
    if (move.value < bestMove.value) {
      bestMove = move;
      movesWithLowestScore = [{ ...bestMove }];
    } else if (bestMove.value === move.value) {
      movesWithLowestScore.push(move);
    }
  }
  return movesWithLowestScore;
};
const getRandomMove = moves => {
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  return randomMove;
};

export {
  isGameOver,
  squaresWithHighestScores,
  squaresWithLowestScores,
  getRandomMove,
  minimax
};
