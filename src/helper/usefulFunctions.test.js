import {
  isGameOver,
  squaresWithHighestScores,
  squaresWithLowestScores,
  getRandomMove,
  minimax
} from './minimax';

describe('minimax helpers', () => {
  test('isGameOver returns {value: n}', () => {
    let xWins = ['X', 'X', 'X', undefined, undefined, undefined, undefined, undefined, undefined,];
    let oWins = ['O', 'O', 'O', undefined, undefined, undefined, undefined, undefined, undefined,];
    let fullBoard = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
    (xWins[0] = 'X'), (xWins[4] = 'X'), (xWins[8] = 'X');
    (oWins[2] = 'O'), (oWins[5] = 'O'), (oWins[8] = 'O');

    expect(isGameOver(xWins, 0).value).toBe(10);
    expect(isGameOver(xWins, 1).value).toBe(-9);
    expect(isGameOver(oWins, 2).value).toBe(8);
    expect(isGameOver(fullBoard, 0).value).toBe(0);
  });
  describe('math helpers', () => {
    let array = [{ value: 0, index: 0 }, { value: 5, index: 1 }, { value: -1, index: 2 }, { value: 3, index: 3 }, { value: 4, index: 4 }];
    test('get squaresWithHighestScores', () => {
      let highestScores = squaresWithHighestScores(array);
      expect(highestScores).toEqual([{ value: 5, index: 1 }]);
      highestScores.push({ value: 5, index: 5 });
      expect(highestScores).toEqual([
        { value: 5, index: 1 },
        { value: 5, index: 5 }
      ]);
      expect(highestScores).not.toEqual([{ value: 5, index: 1 }]);
    });
    test('get squaresWithLowestScores', () => {
      let highestScores = squaresWithLowestScores(array);
      highestScores.push({ value: -1, index: 5 });
      expect(highestScores).toEqual([
        { value: -1, index: 2 },
        { value: -1, index: 5 }
      ]);
    });
    test('getRandomMove returns random values (frequently enough)', () => {
      let randomMoves = [];
      randomMoves.push(getRandomMove(array, 'X'));
      randomMoves.push(getRandomMove(array, 'X'));
      randomMoves.push(getRandomMove(array, 'X'));
      randomMoves.push(getRandomMove(array, 'X'));
      let moveIsRandom =
        randomMoves[0].index === randomMoves[1].index &&
        randomMoves[0].index === randomMoves[2].index &&
        randomMoves[0].index === randomMoves[3].index;
      expect(moveIsRandom).toBe(false);
    });
  });
});

describe('minimax', () => {
  let array = Array(9).fill(undefined);

  describe('test cases', ()=> {
    test('return a (random) value with empty array as input', () => {
      let testCase = minimax([...array], 'X');
      expect(testCase.index).toBeGreaterThan(-1);
      expect(testCase.index).toBeLessThan(9);
    });
  
    test('make winning move ASAP', () => {
      let testCase = [ undefined, undefined, 'O', undefined, undefined, 'O', undefined, undefined, undefined];
      expect(minimax(testCase, 'X').index).toBe(8);
      expect(minimax(testCase, 'O').index).toBe(8);
  
      let testCase2 = [undefined, undefined, 'O', 'O', 'X', 'X', 'X', 'X', 'O'];
      expect(minimax(testCase2, 'X').index).toBe(1);
      expect(minimax(testCase2, 'O').index).toBe(1);

      let testCase3 = ['X', 'O', 'O', 'X', undefined, undefined, undefined, undefined, undefined];
      expect(minimax(testCase3, 'X').index).toBe(6);
      expect(minimax(testCase3, 'O').index).toBe(6);

      let testCase4 = ['O', undefined, 'X', 'X', undefined, 'X', undefined, 'O', 'O']
      expect(minimax(testCase4, 'X').index).toBe(4);
      expect(String(minimax(testCase4, 'O').index)).toMatch(/^4|6$/);

    });
    
    // test('minimax completes a 3 line', () => {});
    test('counter winning moves', () => {
      let testCase = ['O', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
      expect(String(minimax(testCase, 'X').index)).not.toMatch(/^5|7$/);
      expect(String(minimax(testCase, 'O').index)).not.toMatch(/^5|7$/);
  
      let testCase2 = ['X', undefined, undefined,  undefined, 'O', undefined, 'X', undefined, 'O'];
      expect(minimax(testCase2, 'X').index).toBe(3);
      expect(minimax(testCase2, 'O').index).toBe(3);
    });
  })
  test('returns random moves', () => {
    let arrayOfMoves = [];
    arrayOfMoves.push(minimax([...array], 'X'));
    arrayOfMoves.push(minimax([...array], 'X'));
    arrayOfMoves.push(minimax([...array], 'X'));
    arrayOfMoves.push(minimax([...array], 'X'));
    let movesAreNotRandom =
      arrayOfMoves[0].index === arrayOfMoves[1].index &&
      arrayOfMoves[0].index === arrayOfMoves[2].index &&
      arrayOfMoves[0].index === arrayOfMoves[3].index;
    expect(movesAreNotRandom).toBe(false);
  });
});
