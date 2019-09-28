import React from 'react';
import './All.css';
import Square from './Square';

const Board = ({ squares, onClick }) => {
  const board = squares.map((value, i) => (
    <Square value={value} key={i} onClick={() => onClick(i)} />
  ));
  return <div>{board}</div>;
};

export default Board;
