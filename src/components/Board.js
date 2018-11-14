import React, {Component} from 'react';
import './All.css'
import Square from './Square'

// const Board = ({squares, onClick}) => {
class Board extends Component {
  render() {
    const board = this.props.squares.map((value, i)=>
      <Square
        value={value} 
        key={i}
        onClick={()=> this.props.onClick(i)}
      />
    )
  return (
    <div>
      {board}
    </div>
  );
  }
}

export default Board;