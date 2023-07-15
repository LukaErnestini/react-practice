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

  return (
    <div className="container">
      <div className="flex">
        <button
          className="btn"
          onClick={() => {
            handleChange(-1, setStep);
          }}
        >
          -
        </button>
        <p>Step: {step}</p>
        <button
          className="btn"
          onClick={() => {
            handleChange(1, setStep);
          }}
        >
          +
        </button>
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
        <p>Count: {count}</p>
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
    </div>
  );
}

export default App;
