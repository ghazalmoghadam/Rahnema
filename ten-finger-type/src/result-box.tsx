import "./result-box.css";

type ResultBoxProps = {
  result:{
    wpm: number;
    correctWordCount: number;
  }
  };

  export function ResultBox(props: ResultBoxProps) {
     const {wpm, correctWordCount} = props.result;
     const wrongWordCount = wpm - correctWordCount;
     const accuracy = correctWordCount/wpm;
 
     return (
      <div className="result-container">
      <h3 className="result-box-header">
        Result
        <small>
          <a className="fakeLink" href="">
            Screenshot
          </a>
        </small>
      </h3>
      <div className="wpm dark-row">
        <h1>{wpm} WPM</h1>
      </div>
      <div className="light-row">Accuracy {accuracy}</div>
      <div className="dark-row">Correct words {correctWordCount}</div>
      <div className="light-row">Wrong words {wrongWordCount}</div>
    </div>
    );
  }
