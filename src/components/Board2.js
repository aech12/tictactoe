import React, { Component } from 'react';
import './All.css'
import Square from './Square'


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = ({
      boxes: Array(3).fill(null),
      xIsNext: true
    })
  }
  handleClick = (i) => {
    const boxes = this.state.boxes.slice();
    if (this.state.xIsNext) {boxes[i] = 'X'}
    else {boxes[i] = 'O'}
    
    this.setState({
      boxes,
      xIsNext: !this.state.xIsNext
    })
  }
  render() {
    const squares = this.state.boxes.map((xord, i)=> 
      <Square 
        key={i}
        onClick={()=> this.handleClick(i)}
        value={this.state.boxes[i]}
      />
    )
    // [
    //   <Square 
    //     onClick={()=> this.handleClick(1)}
    //     value={this.state.boxes[1]}
    //   />,
    //   <Square 
    //   onClick={()=> this.handleClick(2)}
    //   value={this.state.boxes[2]}
    // />
    // ]
    return (
      <div>
        {squares}
      </div>
    );
  }
}



export default App;
