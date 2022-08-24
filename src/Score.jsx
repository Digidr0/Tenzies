import { React } from "react";
function Score(props) {


  return (
    <div className="Score">
      <div className="time">
        Time: 
        <div className="timer">
          <span>{props.minutes}:</span>
          <span>{props.seconds}:</span>
          <span>{props.miliseconds}</span>
        </div>
      </div>
      <p className="rolls">
        Rolls: <span className="score">{props.roll}</span>
      </p>
      {/* stopwatch
      <div className="stopwatch">
        <div className="numbers"></div>
        <div className="buttons">
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Stop</button>
          <button onClick={() => setTime(0)}>Reset</button>
        </div>
      </div> */}
    </div>
  );
}
export default Score;
