import { useState } from "react";
import "./App.css";
import { UserInputBar } from "./user-input-bar";
import { WordsBox } from "./words-box";
import wordsRepo from "./words.json";
import { ResultBox } from "./result-box";

const SAMPLE_SIZE = 150;

function getRandomWord() {
  // [0, 1) * n -> [0, n) = [0, 1), [1, 2), ... ,[n -1, n) --floor--> 0, 1, 2,..., n-1
  const randomIdx = Math.floor(Math.random() * wordsRepo.length);
  return wordsRepo[randomIdx];
}

function createWordsArray() {
  return Array.from({ length: SAMPLE_SIZE }, getRandomWord /* map */);
}

function App() {
  const [words, setWords] = useState(createWordsArray);
  const [typedWords, setTypedWords] = useState([""]);
  const [isFinish, setIsFinish] = useState(false);
  const [result, setResult] = useState({wpm:0, correctWordCount:0});


  const handleType = (typed: string) => {
    const newTypedWords = typedWords.slice(0, -1);
    newTypedWords.push(typed);
    setTypedWords(newTypedWords);
  };

  const handleWord = (typed: string) => {
    const newTypedWords = typedWords.slice(0, -1);
    newTypedWords.push(typed);
    newTypedWords.push("");
    setTypedWords(newTypedWords);
  };

  const handleReset = () => {
    setWords(createWordsArray());
    setTypedWords([""]); //first word is typing
    setIsFinish(false);
  };

  const handleTimeOver=()=>{
    setIsFinish(true); 
    setResult(calculateResult());
  };

  function calculateResult(){
    let correctWordCount = 0;
    const wpm = typedWords.length
    
    for(let i=0; i<wpm; i++)
      if(typedWords[i]=== words[i])
        correctWordCount++;
    
    return {wpm, correctWordCount };
  }
 
  return (
    <>
      {!isFinish && (<WordsBox
        words={words}
        typedWords={typedWords}
      />)}
      
      <UserInputBar
        onType={handleType}
        onWord={handleWord}
        onReset={handleReset}
        onTimeOver={handleTimeOver}
      />

      {isFinish && (<ResultBox 
      result={result}/>
      )}
    </>
  );
}

export default App;
