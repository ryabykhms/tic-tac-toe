import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderBoardRows() {
    const boardRows = [];
    let count = 0;
    for (let i = 0; i < this.props.squares.length; i++) {
      if (i % 3 === 0) {
        count++;
        boardRows[count] = [];
      }
      boardRows[count].push(i);
    }
    return boardRows.map((squares, index) => {
      return (
        <div key={index} className="board-row">
          {squares.map((square, idx) => {
            return <Square key={idx}
                           selected={this.props.currentSquares.indexOf(square) !== -1}
                           value={this.props.squares[square]}
                           onClick={() => this.props.onClick(square)}
            />
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderBoardRows()}
      </div>
    );
  }
}

export default Board;