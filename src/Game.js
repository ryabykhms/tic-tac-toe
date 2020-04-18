import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        xStep: null,
        yStep: null,
      }],
      currentStepNumber: 0,
      xIsNext: true,
      sortStepsAsc: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    const current = history[history.length - 1];
    const xStep = Math.floor(1 + i / 3);
    const yStep = i % 3 + 1;
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        xStep: xStep,
        yStep: yStep,
        stepNumber: history.length,
      }]),
      currentStepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleChange() {
    this.setState((prevState) => {
      return {
        history: prevState.history.reverse(),
        sortStepsAsc: !prevState.sortStepsAsc
      }
    });
  }

  jumpTo(step) {
    this.setState({
      currentStepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.currentStepNumber];
    const {winner, winnerRow} = calculateWinner(current.squares);
    const currentSquare = 3 * (current.xStep - 1) + current.yStep - 1;
    const currentSquares = winner ? winnerRow : [currentSquare];
    const sortStepsAsc = this.state.sortStepsAsc;

    const moves = [].concat(this.state.history)
      .map((step, move) => {
        const currentStepClass = this.state.currentStepNumber === move ? 'button--green' : '';
        const desc = step.stepNumber ?
          'Go to step #' + step.stepNumber + ' (' + step.xStep + ';' + step.yStep + ')' :
          'Go to start game';
        return (
          <li key={move}>
            <button className={`button ${currentStepClass}`} onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }).sort();

    let status;
    if (winner) {
      status = 'The winner is ' + winner;
    } else if (history.length === 10) {
      status = 'The game ended in a draw!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            currentSquares={currentSquares}
            squares={current.squares}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <label>Sort Moves
            <input id="sort-moves" name="sort-moves" type="checkbox" checked={sortStepsAsc}
                   onChange={this.handleChange}/>
          </label>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
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
      return {winner: squares[a], winnerRow: lines[i]};
    }
  }

  return {winner: null, winnerRow: null};
}

export default Game;