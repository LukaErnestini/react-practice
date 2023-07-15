import { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    if (step < 2) return;
    setStep(step - 1);
  }

  function handleNext() {
    if (step > 2) return;
    setStep(step + 1);
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button className="previous" onClick={handlePrevious}>
          Previous
        </button>
        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
