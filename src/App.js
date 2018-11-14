import React, { Component } from 'react';
import './components/All.css';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {squares: Array(9).fill(null)}
      ],
      xIsNext: true,
      stepCount: 0
    }
  }

  handleClick = (i) => {
    // const history = this.state.history;
    // ^ this leads to a bug when clicking back on history ^
    const step = this.state.stepCount;
    const history = this.state.history.slice(0, step+1);
    const squares = history[history.length-1].squares.slice();
    if (calculateWinner(squares)||squares[i]) {return;}

    if (this.state.xIsNext) {squares[i]='X'}
    else {squares[i]='O'}
    this.setState({
      history: history.concat([{squares}]),
      xIsNext: !this.state.xIsNext,
      stepCount: history.length
    })
    console.log(this.state.history)
  }
  jumpTo=(i)=> {
    this.setState({
      stepCount: i,
      xIsNext: (i % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const squares = history[history.length-1].squares.slice();
    let status;
    
    const winner = calculateWinner(squares)
    if (winner) {
      status = `Winner is ${winner}`
    } else {
      status = `Next player is: ${this.state.xIsNext?'X':'O'}`
    }
    const moves = 
    history.map((d, i)=> {
      let msg = i?`Go to move: #${i}`:`Go to game start`
      return (
        <li key={i}>
          <button onClick={()=> this.jumpTo(i)}>
            {`${msg}`}
          </button>
        </li>
      )
    })

    return (
      <div className='game'>
        <div className='leftside'>
          <div className='status'>{status}</div>
          <div className='board'>
            <Board
              squares={history[this.state.stepCount].squares}
              onClick={this.handleClick}
            />
          </div>
        </div>
        <ul>{moves}</ul>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;