import { useState } from "react";
import { Board } from "./Board";

export function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(i) {
    if (calculateWinner(current.squares) || current.squares[i]) {
      // return early if there's a winner or the square is already filled
      return;
    }

    // update the square that was clicked
    const newSquares = [...current.squares];
    newSquares[i] = xIsNext ? "X" : "O";

    // add this board state the history
    setHistory((prevHistory) => prevHistory.concat([{ squares: newSquares }]));

    // update which user is "up"
    setXIsNext((previousValue) => !previousValue);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} handleClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
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
