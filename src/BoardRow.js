import React from "react";
import Square from "./Square";

function BoardRow(props) {
  const rowSquares = props.rowSquares;
  const squares = props.squares;
  const squareElements = rowSquares.map((square, idx) => {
    return (
      <Square
        key={idx}
        selected={props.currentSquares.indexOf(square) !== -1}
        value={squares[square]}
        onClick={() => props.onClick(square)}/>
    )
  });

  return (
    <div className="board-row">
      {squareElements}
    </div>
  )
}

export default BoardRow;