import { useState, useEffect } from "react";
import "../styles/Timer.css";

function Timer({ timeLimit, onTimeUp, isActive, onReset }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds

  useEffect(() => {
    setTimeLeft(timeLimit * 60);
  }, [timeLimit]);

  useEffect(() => {
    if (onReset) {
      setTimeLeft(timeLimit * 60);
    }
  }, [onReset, timeLimit]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft <= 1) {
            onTimeUp();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (!isActive || timeLeft === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimerClass = () => {
    const percentage = (timeLeft / (timeLimit * 60)) * 100;
    if (percentage <= 10) return "timer critical";
    if (percentage <= 25) return "timer warning";
    return "timer";
  };

  return (
    <div className={getTimerClass()}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-display">
        <span className="time-text">{formatTime(timeLeft)}</span>
        <div className="timer-label">Time Remaining</div>
      </div>
    </div>
  );
}

export default Timer;
