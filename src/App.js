import React, { useState, useEffect } from "react";
import "./App.css";
const CountdownTimer = () => {
  const [timeInput, setTimeInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (timerRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      alert("Time's up!");
      setTimerRunning(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    const totalTimeInSeconds = timeInput * 60;

    setTimeRemaining(totalTimeInSeconds);
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const updateTimerDisplay = () => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}`;
    return formattedTime;
  };
  const checktime = () => {
    setTimeRemaining(0);
    setTimerRunning(false);
  };
  const padZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <>
      <div className="maincomponent">
        <div className="second">
          <div className="enter">
            <label htmlFor="timeInput">Enter Minutes</label>
          </div>
          <div className="inp">
            <input
              type="text"
              id="timeInput"
              value={timeInput}
              onChange={(e) => {
                setTimeInput(e.target.value);
                setTimerRunning(false);
                setTimeRemaining(0);
              }}
            />
          </div>
        </div>

        <div id="timer">{updateTimerDisplay()}</div>
        <div id="controls">
          <button onClick={startTimer}>Start</button>
          <button onClick={pauseTimer}>Pause</button>
          <button onClick={checktime}>Reset</button>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;
