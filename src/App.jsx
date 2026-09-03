import { useState } from "react";
import "./App.css";
import History from "./components/History";


function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [history, setHistory] = useState([]);  
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const inputNumber = (number) => {
    if (display === "0" || waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display + number);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondNumber) {
      setDisplay("0.");
      setWaitingForSecondNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? "Error" : a / b;
      default:
        return b;
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondNumber) {
      setOperator(nextOperator);
      return;
    }

    if (firstNumber === null) {
      setFirstNumber(inputValue);
    } else if (operator) {
      const result = calculate(firstNumber, inputValue, operator);

      if (result === "Error") {
        setDisplay("Error");
        setFirstNumber(null);
        setOperator(null);
        return;
      }

      setDisplay(String(result));
      setFirstNumber(result);
    }

    setWaitingForSecondNumber(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
  if (operator === null || firstNumber === null) return;

  const secondNumber = parseFloat(display);
  const result = calculate(firstNumber, secondNumber, operator);

  if (result === "Error") {
    setDisplay("Error");
    setFirstNumber(null);
    setOperator(null);
    return;
  }

  setHistory((prevHistory) => [
    ...prevHistory,
    {
      expression: `${firstNumber} ${operator} ${secondNumber}`,
      result: result,
    },
  ]);

  setDisplay(String(result));
  setFirstNumber(null);
  setOperator(null);
  setWaitingForSecondNumber(true);
};


  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const buttons = [
    ["C", "clear"],
    ["÷", "operator"],
    ["×", "operator"],
    ["-", "operator"],

    ["7", "number"],
    ["8", "number"],
    ["9", "number"],
    ["+", "operator"],

    ["4", "number"],
    ["5", "number"],
    ["6", "number"],
    ["=", "equals"],

    ["1", "number"],
    ["2", "number"],
    ["3", "number"],
    ["0", "number"],
  ];

  return (
  <div className="app-container">

    <div className="calculator">

      <div className="display">
        {display}
      </div>

      <div className="buttons">
        {buttons.map(([value, type]) => (
          <button
            key={value}
            className={`button ${type}`}
            onClick={() => {
              if (type === "number") inputNumber(value);
              if (type === "operator") handleOperator(value);
              if (type === "equals") handleEquals();
              if (type === "clear") clearCalculator();
            }}
          >
            {value}
          </button>
        ))}

        <button
          className="button decimal"
          onClick={inputDecimal}
        >
          .
        </button>
      </div>

    </div>

    <History
      history={history}
      onClear={() => setHistory([])}
    />

  </div>
);

}

export default App;
