import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./App.css";

// function createBoard(){
//   const rows: number = 10;
//   const cols: number = 16;
//   let arr: boolean[][] = [];
//    for (let i = 0; i < rows; i++) {
//        arr[i] = [];
//        for (let j = 0; j < cols; j++) {
//           arr[i][j] = false;
//        }
//     }
//     return arr;
// }

const arrowKeyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
} satisfies Record<string, number>;

//type BoardContent = "empty" | "snake" | "apple";
// let myBoardArray: BoardContent[][];
// function createBoard2() {
//   const rows = 20;
//   const columns = 32;
//   myBoardArray = Array(rows)
//     .fill("empty")
//     .map(() => Array<BoardContent>(columns).fill("empty"));
//   return myBoardArray;
// }
//  function initialSnake(){
//   myBoardArray[0][1]= myBoardArray[0][2]= myBoardArray[1][2]='snake';
//  }
function randomIdx() {
  return Math.floor(Math.random() * myBoardArray.length);
}

type Cell = { i: number; j: number };

function isSame(b1: Cell, b2: Cell) {
  return b1.i == b2.i && b1.j == b2.j;
}

type State = {
  apple: Cell;
  snake: Cell[];
};

function calculateGridClassName({ snake, apple }: State, cell: Cell) {
  if (isSame(cell, apple)) {
    return "cell-apple"; // apple class
  }

  for (const snakeCell of snake) {
    if (isSame(cell, snakeCell)) return "cell-snake";
  }

  return "cell-empty";
}

// const rowIndices = Array.from({length: 20}, (_, i) => i);
// const colIndices = Array.from({length: 32}, (_, j) => j);
const rowIndices = Array(20).fill(0).map((_, i) => i);
const colIndices = Array(32).fill(0).map((_, j) => j);

function App() {
  const [state, setState] = useState<State>({
    // const [snake, setSnake] = useState({
    apple: { i: 3, j: 5 },
    snake: [
      { i: 10, j: 10 },
      { i: 10, j: 11 },
      { i: 10, j: 12 },
    ],
  });

  // const [apple, setApple] = useState();
  // let [board, setBoard] = useState<BoardContent[][]>(createBoard2());
  // const [fps, setFps] = useState(3);

  // function setApple() {
  //   setBoard((board) => {
  //     const [x, y] = [randomIdx(), randomIdx()];
  //     board = [...board];
  //     board[x] = [...board[x]];
  //     board[x][y] = "apple";
  //     return board;
  //   });

  //   //  setBoard(boardState =>
  //   //   {
  //   //    const newBoard = [...boardState];
  //   //    newBoard[x] = boardState[x].map((col,j)=> j == y ? 'apple': col);
  //   //    return newBoard
  //   //  });
  // }

  // useEffect(() => {
  //   console.log("useEffect called");

  //   if (!cellRef.current) return;

  //   const clickHandler = () => {
  //     console.log("click!");
  //   };
  //   cellRef.current.addEventListener(
  //     "click",
  //     (event) => {
  //       console.log(event);
  //       console.log("***", event.target);
  //       clickHandler();
  //     }
  //     //, { once: true } //is it necessary?
  //   );

  //   const cleanUp = () =>
  //     cellRef.current?.removeEventListener("click", clickHandler);

  //   return cleanUp;
  // }, []);

  return (
    <>
      <div className="board">
        {/* {board.map((row, rowIdx) => {
          const rowKey = rowIdx;
          return (
            <div key={rowKey} className="row">
              {row.map((col, colIdx) => {
                const colKey = `${rowIdx}-${colIdx}`;
                const contentClass: string =
                  col == "empty"
                    ? "cell-empty"
                    : col == "snake"
                    ? "cell-snake"
                    : "cell-apple";
                const cellClass = `col ${contentClass}`;
                return (
                  <div key={colKey} className={cellClass}></div>
                );
              })}
            </div>
          );
        })} */}
        {rowIndices.map((i) => (
          <div key={i} className="row">
            {colIndices.map((j) => (
              <div
                key={`${i}-${j}`}
                className={"col " + calculateGridClassName(state, { i, j })}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
