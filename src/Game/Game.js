import React from "react";
import "./Game.css";
import Board from "../Board/Board.js";
import { useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const [width, height] = useWindowSize();

  const handleClick = (i) => {
    const boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="container">
      {/* {winner ? (
        <Confetti>
          width={width}
          height={height}
        </Confetti>
      ) : null} */}
      <div className="game">
        <h1 className="heading">Tic Tac Toe</h1>
        <Board squares={board} onClick={handleClick} />
        <div>
          <p className="text">
            {winner
              ? "Winner: " + winner
              : "Next Player: " + (xIsNext ? "X" : "O")}
          </p>
        </div>
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default Game;

export function calculateWinner(squares) {
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
