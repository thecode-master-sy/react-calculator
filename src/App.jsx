import { useState, useReducer } from "react";
import Number from "./components/NumberButtons";
import Operator from "./components/OperatorButtons";
import { Evaluate } from "./Evaluate";
import "./App.css";

export const Actions = {
  Add_digit: "add-digit",
  Remove_digit: "remove-digit",
  Add_Operator: "add-operator",
  Add_Decimal: "add-decimal",
  Clear: "clear",
  Calculate: "calculate",
};

const reducer = (state, action) => {
  switch (action.type) {
    case Actions.Add_digit: {
      return {
        ...state,
        currentNumber:
          state.currentNumber == 0 || state.lastPressed == "operator"
            ? action.payload.value
            : state.currentNumber.toString() + action.payload.value.toString(),
        lastPressed: "digit",
        calculations:
          state.currentNumber === 0
            ? state.calculations
            : state.calculations + state.currentNumber.toString(),
      };
    }

    case Actions.Add_Operator: {
      const evaluated = Evaluate(
        state.previousNumber,
        state.operator,
        state.currentNumber
      );
      return {
        ...state,
        previousNumber:
          state.operator && state.lastPressed === "digit"
            ? evaluated
            : state.currentNumber,
        currentNumber:
          state.operator && state.lastPressed === "digit"
            ? evaluated
            : state.currentNumber,
        operator: action.payload.value,
        lastPressed: "operator",
        calculations: state.operator
          ? state.calculations + state.operator
          : state.calculations,
      };
    }

    case Actions.Add_Decimal: {
      return {
        ...state,
        currentNumber: state.currentNumber.toString().includes(".")
          ? state.currentNumber
          : state.currentNumber.toString() + action.payload.value,
      };
    }

    case Actions.Calculate: {
      //i stopped here, yet to create the evaluate function==> recent stop
      const evaluated = Evaluate(
        state.previousNumber,
        state.operator,
        state.currentNumber
      );
      return {
        ...state,
        currentNumber: evaluated,
        previousNumber: evaluated,
        calculations: "",
      };
    }

    case Actions.Clear: {
      console.log("the calculator has been cleared");
      return {
        ...state,
        currentNumber: 0,
        previousNumber: null,
        lastPressed: null,
        operator: null,
        calculations: "",
      };
    }

    default: {
      return state;
    }
  }
};

function App() {
  const [display, dispatch] = useReducer(reducer, {
    currentNumber: 0,
    previousNumber: null,
    lastPressed: null,
    operator: null,
    calculations: "",
    check: " ",
  });

  return (
    <div className="App">
      <p> {JSON.stringify(display)}</p>
      <div className="CalcContainer">
        <div className="Screen">
          <span className="fs-small display-block mg-bottom-large">
            {display.previousNumber ? display.previousNumber : " "}{" "}
            {display.operator ? display.operator : ""}
          </span>
          <span className="fs-large">{display.currentNumber}</span>
        </div>
        <div className="ButtonContainer">
          <div className="Number">
            <button onClick={() => dispatch({ type: Actions.Clear })}>
              AC
            </button>
            <button>±</button>
            <button>%</button>

            <Number dispatch={dispatch} payload={{ value: 7 }} />
            <Number dispatch={dispatch} payload={{ value: 8 }} />
            <Number dispatch={dispatch} payload={{ value: 9 }} />
            <Number dispatch={dispatch} payload={{ value: 4 }} />
            <Number dispatch={dispatch} payload={{ value: 5 }} />
            <Number dispatch={dispatch} payload={{ value: 6 }} />
            <Number dispatch={dispatch} payload={{ value: 1 }} />
            <Number dispatch={dispatch} payload={{ value: 2 }} />
            <Number dispatch={dispatch} payload={{ value: 3 }} />
            <Number dispatch={dispatch} payload={{ value: 0 }} />
            <Number dispatch={dispatch} payload={{ value: "." }} />
          </div>

          <div className="Operator">
            <Operator dispatch={dispatch} payload={{ value: "+" }} />
            <Operator dispatch={dispatch} payload={{ value: "-" }} />
            <Operator dispatch={dispatch} payload={{ value: "÷" }} />
            <Operator dispatch={dispatch} payload={{ value: "x" }} />
            <Operator dispatch={dispatch} payload={{ value: "=" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
