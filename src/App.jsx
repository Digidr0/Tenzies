import { React, useState, useEffect } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

import "./App.css";

import Die from "./Die.jsx";
import Score from "./Score.jsx";
import Scoreboard from "./ScoreBoard.jsx";
import Settings from "./Settings.jsx";

function App() {
  const [numberOfDices, setNumberOfDices] = useState(10);
  const [dice, setDice] = useState(allNewDice(numberOfDices));
  const [tenzies, setTenzies] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [roll, setRoll] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem("highScores")) ||
      localStorage.setItem("highScores", JSON.stringify(allNewHighScores()))
  );
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const allHeled = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeled && allSameValue) {
      setRunning(false);
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }, [highScores]);

  function generateNewHighScore(
    time = Math.round(Math.random() * 50000),
    rolls = Math.round(Math.random() * 10)
  ) {
    return {
      time: time,
      rolls: rolls,
      id: nanoid(),
    };
  }

  useEffect(() => {
    newGame();
  }, [numberOfDices, useNumbers]);

  function allNewHighScores() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewHighScore());
    }
    return arr;
  }

  function allNewDice() {
    let arr = [];
    for (let i = 0; i < numberOfDices; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  }

  function reRoll() {
    setRoll((prev) => prev + 1);
    setDice((prev) =>
      prev.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function hold(id) {
    setRunning(true);
    setDice((prev) =>
      prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function newGame() {
    setHighScores((prev) => {
      let arr = [];
      let check = true;
      for (let i = 0; i < prev.length; i++) {
        //CHECK
        if (
          (check && (prev[i].time / (prev[i].rolls === 0 ? 1 : prev[i].rolls),
          time / (roll === 0 ? 1 : roll)))
        ) {
          arr.push(generateNewHighScore(time, roll));
          check = false;
        } else {
          arr.push(prev[i]);
        }
      }
      return arr;
    });
    setRoll(0);
    setTime(0);
    setTenzies(false);
    setRunning(false);
    setDice(allNewDice(numberOfDices));
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      handleClick={() => hold(die.id)}
      useNumbers={useNumbers}
      color="#fff6e8"
      activeColor="#29E391"
    />
  ));

  const highScoreElements = highScores.map((highScore, i) => (
    <tr key={highScore.id}>
      <td>{`${i + 1}. `}</td>
      <td>
        {("0" + Math.floor((highScore.time / 60000) % 60)).slice(-2) +
          ":" +
          ("0" + Math.floor((highScore.time / 1000) % 60)).slice(-2) +
          ":" +
          ("0" + ((highScore.time / 10) % 100)).slice(-2)}
      </td>
      <td>{highScore.rolls}</td>
    </tr>
  ));

  return (
    <main className="App">
      {tenzies && (
        <Confetti numberOfPieces={800} tweenDuration={10000} recycle={false} />
      )}
      <section className="section-scoreboard">
        <Scoreboard highScores={highScoreElements} />
      </section>
      <section className="section-game">
        <div className="game">
          <Score
            roll={roll}
            minutes={("0" + Math.floor((time / 60000) % 60)).slice(-2)}
            seconds={("0" + Math.floor((time / 1000) % 60)).slice(-2)}
            miliseconds={("0" + ((time / 10) % 100)).slice(-2)}
          />
          <div className="description">
            <h1>Tenzies</h1>
            <p>
              Roll until all dice are the same.Click each die to freeze it at
              its current value between rolls.
            </p>
          </div>
          <div className="die-grid">{diceElements}</div>
          <div className="btns">
            <button className="reRoll btn" onClick={tenzies ? newGame : reRoll}>
              {tenzies ? "New game" : "New roll"}
            </button>
            <button className="reset btn" onClick={newGame}>
              Reset
            </button>
          </div>
        </div>
      </section>
      <section className="section-settings">
        <Settings
          changeDices={(e) => {
            setNumberOfDices(e);
          }}
          changeUseNumbers={(b) => {
            setUseNumbers(b);
          }}
          activeColor="#fff6e820"
        />
      </section>
    </main>
  );
}
export default App;
