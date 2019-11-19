import React from "react";
import "./All.css";
import { Input, Button } from "@material-ui/core";

const PregameOptions = ({
  startGame,
  gameIsVsPC,
  playerOneName,
  playerTwoName,
  changePlayerName,
  vsPC
}) => {
  // prettier-ignore
  // const [vsMode, setvsMode] = useState(true);
  // const checkedButton = e => {
  //   const [checked, setChecked] = useState(false);
  //   // const onClick =
  // };
  // const vsPC =

  //   const usePlayer = player => {
  //     const [name, setName] = useState('');
  //     const onChange = e => {
  //       setName(e.target.value);
  //     };
  //     return {
  //       name,
  //       onChange
  //     };
  //   };
  //   const p1 = usePlayer();

  // bt1 = false;
  // bt2 = true;

  const vsPcMode = vsPC ? "contained" : "outlined";
  const vsHumanMode = !vsPC ? "contained" : "outlined";

  return (
    <form onSubmit={startGame}>
      <div>
        <h1>TicTacToe</h1>
      </div>
      <div>
        <p>Mode: </p>
        <Button
          variant={`${vsPcMode}`}
          color="primary"
          onClick={() => gameIsVsPC(true)}
        >
          Human vs PC
        </Button>

        <Button
          variant={`${vsHumanMode}`}
          color="primary"
          onClick={() => gameIsVsPC(false)}
        >
          Human vs Human
        </Button>
      </div>

      <div>
        <p>P1 Name:</p>
        <Input
          defaultValue="secondary"
          value={playerOneName}
          onChange={e => changePlayerName(e, "playerOneName")}
          placeholder="Basic usage"
        />
        <p>P2 Name:</p>
        <Input
          value={playerTwoName}
          onChange={e => changePlayerName(e, "playerTwoName")}
          placeholder="Basic usage"
        />
        {/* {console.log("b", Button)} */}
      </div>

      <Button
        style={{ marginTop: "15px" }}
        variant="contained"
        color="secondary"
        type="submit"
      >
        Start
      </Button>

      {/*
       <p>
         Play:
         <Button>
           <input type='radio' id='Xradio' name='XorO'></input>First
         </Button>
         <Button>
           <input type='radio' id='Oradio' name='XorO'></input>Second
         </Button>
       </p>
      */}
    </form>
  );
};

export default PregameOptions;
