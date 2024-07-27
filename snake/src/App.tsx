import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./App.css";

const ROW_COUNT = 20;
const COL_COUNT = 32;

// const rowIndices = Array.from({length: 20}, (_, i) => i);
// const colIndices = Array.from({length: 32}, (_, j) => j);
const arrowKeys = ['ArrowDown','ArrowLeft', 'ArrowRight', 'ArrowUp'] as const;
type ArrowKey = (typeof arrowKeys)[number];

const rowIndices = Array(ROW_COUNT)
.fill(0)
.map((_, i) => i);

const colIndices = Array(COL_COUNT)
.fill(0)
.map((_, j) => j);

const arrowKeyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
} satisfies Record<string, number>;

//  }
function randomCell() {
  return {
    i: Math.floor(Math.random() * ROW_COUNT),
    j: Math.floor(Math.random() * COL_COUNT),
  };
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
    return "cell-apple"; 
  }

  for (const snakeCell of snake) {
    if (isSame(cell, snakeCell)) return "cell-snake";
  }

  return "cell-empty";
}

function App() {
  const [state, setState] = useState<State>({
    apple: { i: 3, j: 5 },
    snake: [
      { i: 10, j: 10 },
      { i: 10, j: 11 },
      { i: 10, j: 12 },
    ],
  });

  const [direction, setDirection] = useState<{x: number, y: number}>({x: 1, y:0});
  const [frame, setFrame] = useState(0);


  useEffect(() => {
    const iid = setInterval(() => setFrame(prev => prev + 1), 500);
    return () => clearInterval(iid);
  }, [])


  useEffect(() => {
    moveSnake();
  }, [frame]);



  useEffect(() => {
    console.log("useEffect called");
    window.addEventListener('keydown',(event)=>{
      const arrowKey = event.key;   
      switch (arrowKey) {
     case 'ArrowDown':
      if(direction.x!= -1)
       setDirection({x: 1, y:0});
      
       break; 
       case "ArrowLeft":
        if(direction.y!= 1)
         setDirection({x: 0, y:-1});
       break;
       case 'ArrowRight':
        if(direction.y!= -1)
         setDirection({x: 0, y:1});
       break;
       case 'ArrowUp':
        if(direction.x!= 1)//kharab
         setDirection({x: -1, y:0});
       break;
     default:
       return 'ilegal arrowkey!'; //????   
     
     }
    });
    const cleanUp = () =>
      {};

    return cleanUp;
  }, []);

  // useEffect(() => {
  //   console.log("useEffect called");
    
  //   window.addEventListener(
  //     "keydown",
  //     (event) => {
        
  //       if(!arrowKeys.includes(event.key)) return;
      
  //     const arrowKey = event.key;   
  //      switch (arrowKey) {
  //     case 'ArrowDown':
  //       setDirection({x: -1, y:0});
       
  //       break; 
  //       case "ArrowLeft":
  //         setDirection({x: 0, y:1});
  //       break;
  //       case 'ArrowRight':
  //         setDirection({x: 0, y:1});
  //       break;
  //       case 'ArrowUp':
  //         setDirection({x: -1, y:0});
  //       break;
  //     default:
  //       return 'ilegal arrowkey!'; //????   
      
  //     }
  //     }
  //   // )}, const cleanUp = () =>{
  //   //  // window.removeEventListener("keydown",()=>());
  //   // }
  //   // return cleanUp;
  // }, []);

  function isSnake(cell: Cell){
    return state.snake.some(c=> c==cell);
  }

  function isApple(cell: Cell)
  {
    return state.apple==cell;
  }
  
  function isLegalMove(newHead:Cell){
    
     const isEmptyCell = !isSnake(newHead) ;     //ya border board 
     //console.log('is not snake : ' , isEmptyCell)
        
     return isEmptyCell;
    }
  
  function  moveSnake(){

    // const head = state.snake[0];
    // const { i:headI , j:headY } = head;
    // console.log('heaed of snake i , y : ',headI,headY)
    // let newHead:Cell={i:0, j:0};

    setState(prevState => {
      const newSnake = [...prevState.snake];
      const head = prevState.snake[0];
      const newHead = {i: head.i + direction.x, j: head.j + direction.y};
      newSnake.unshift(newHead);
      newSnake.pop();
      return {
        ...prevState,
        snake: newSnake
      }
    })
    
    // switch (direction) {
    //   case 'ArrowDown':
    //     newHead= {i:headI+1, j:headY};
       
    //     break; 
    //     case "ArrowLeft":
    //       newHead= {i:headI, j:headY-1};
    //     break;
    //     case 'ArrowRight':
    //       newHead= {i:headI, j:headY+1};
    //     break;
    //     case 'ArrowUp':
    //       newHead= {i:headI-1, j:headY};
    //     break;
    //   default:
    //     return 'ilegal arrowkey!'; //????
       
    // // } 
    // console.log('newhead' , newHead.i, newHead.j)
    // console.log('old snake..', state.snake)
    
    // if(isLegalMove(newHead) && isApple(newHead)){
    //   console.log('apple  snake..',state.snake)

    //   scoredMove(newHead);
    // }
    // else if(isLegalMove(newHead)){
      
    //   normalMove(newHead);
    //   console.log('new snake..', state.snake)
    // }
  }

  function normalMove(newHead:Cell){
      
    setState(s=> {
       const newSnake = [...s.snake];
       newSnake.unshift(newHead);
       newSnake.pop();
       const newState= {...s , snake:newSnake};
       return newState;
      });
  }
 
  function scoredMove(newHead:Cell){
      
    setState(s=> {
       const newSnake = [...s.snake];
       newSnake.unshift(newHead);
       const newStae= {...s , snake:newSnake};
       return newStae;
      });
  }

  return (
    <>
      <div className="board">
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
