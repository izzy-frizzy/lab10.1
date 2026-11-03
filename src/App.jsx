
import { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  // Initialize count from localStorage
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("counter");
    return savedCount !== null ? Number(savedCount) : 0;
  });

  // Track previous count values
  const [history, setHistory] = useState([]);

  // Custom step value
  const [step, setStep] = useState(1);

  // Handle incrementing and decrementing
  const changeCount = (amount) => {
  const newCount = count + amount;

  setCount(newCount);

  setHistory((previousHistory) => [
    ...previousHistory,
    newCount
  ]);
};

  // Increment
  const increment = () => {
    changeCount(step);
  };

  // Decrement
  const decrement = () => {
    changeCount(-step);
  };

  // Reset counter and history
  const reset = () => {
    setCount(0);
    setHistory([]);
  };

  // Update custom step
  const handleStepChange = (event) => {
    const value = Number(event.target.value);

    if (value >= 1) {
      setStep(value);
    }
  };

  // AUTO-SAVE COUNT TO LOCAL STORAGE
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("counter", count);
    }, 300);

    // Cleanup previous save if count changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [count]);

  // KEYBOARD EVENT LISTENERS
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger counter while typing in an input
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        increment();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        decrement();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [increment, decrement]);

  return (
    <div className="app">
      <div className="counter-container">

        <h1>Advanced Counter</h1>

        {/* Current Count */}
        <div className="count-display">
          <h2>{count}</h2>
        </div>

        {/* Counter Buttons */}
        <div className="button-container">
          <button onClick={decrement} className="decrement">
            - Decrement
          </button>

          <button onClick={increment} className="increment">
            + Increment
          </button>
        </div>

        {/* Custom Step Input */}
        <div className="step-container">
          <label htmlFor="step">Step Value:</label>

          <input
            id="step"
            type="number"
            min="1"
            value={step}
            onChange={handleStepChange}
          />
        </div>

        {/* Reset Button */}
        <button onClick={reset} className="reset">
          Reset Counter
        </button>

        {/* History */}
        <div className="history-container">
          <h3>Count History</h3>

          {history.length > 0 ? (
            <ul>
              {history.map((value, index) => (
                <li key={index}>
                  {value}
                </li>
              ))}
            </ul>
          ) : (
            <p>No count changes yet.</p>
          )}
        </div>

        {/* Keyboard Instructions */}
        <div className="keyboard-info">
          <p>Keyboard Controls:</p>
          <span>↑ Arrow Up: Increment</span>
          <span>↓ Arrow Down: Decrement</span>
        </div>

      </div>
    </div>
  );
}

export default App;
