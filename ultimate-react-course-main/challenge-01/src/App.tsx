import { useState } from "react";
import "./App.css";

function App() {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleChange(
    change: number,
    setFunc: React.Dispatch<React.SetStateAction<number>>
  ) {
    setFunc((v) => v + change);
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", dateOptions).replace(/,/g, "");
  }

  function handleReset() {
    setCount(0);
    setStep(1);
  }

  return (
    <div className="container">
      <div className="flex">
        <input
          type="range"
          min={0}
          max={10}
          value={step}
          onChange={(e) => {
            setStep(+e.target.value);
            console.log(e.target.value);
          }}
        />
        <p>{step}</p>
      </div>
      <div className="flex">
        <button
          className="btn"
          onClick={() => {
            handleChange(-step, setCount);
          }}
        >
          -
        </button>
        <input
          type="number"
          value={count}
          onChange={(e) => {
            setCount(+e.target.value);
          }}
        />
        <button
          className="btn"
          onClick={() => {
            handleChange(step, setCount);
          }}
        >
          +
        </button>
      </div>
      <p>
        {count === 0 ? "Today" : `${count} days from today`} is{" "}
        {formatDate(date)}
      </p>
      {count !== 0 || step !== 1 ? (
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
