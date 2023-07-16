import { ReactNode, useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step < 2) return;
    setStep((s) => s - 1);
  }

  function handleNext() {
    if (step > 2) return;
    setStep((s) => s + 1);
  }

  return (
    <>
      <button
        className="close"
        onClick={() => {
          setIsOpen((is) => !is);
        }}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({
  step,
  children,
}: {
  step: number;
  children: ReactNode;
}) {
  return (
    <p className="message">
      Step {step}: {children}
    </p>
  );
}

function Button({
  textColor,
  bgColor,
  onClick,
  children,
}: {
  textColor: string;
  bgColor: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button style={{ background: bgColor, color: textColor }} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
