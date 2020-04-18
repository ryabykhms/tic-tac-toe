import React from "react";
import BoardRow from "./BoardRow";

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
        <BoardRow
          key={index} currentSquares={this.props.currentSquares}
          rowSquares={squares}
          squares={this.props.squares}
          onClick={this.props.onClick}/>
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