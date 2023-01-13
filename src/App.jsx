import { useState, useReducer, useMemo } from "react";
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
  Delete: "delete",
  Calculate: "calculate",
};

export const Format = (number) => {
  const formater = new Intl.NumberFormat();

  if (number.toString().includes(".")) {
    const splitNum = number.toString().split(".");

    let whole = splitNum[0];
    let decimal = splitNum[1];

    whole = formater.format(whole);

    const joined = whole + "." + decimal;

    // const decimalNum = splitNum[1];
    //
    // const wholeFormated = wholeNum.toLocaleString();

    return joined;
  } else {
    return formater.format(number);
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case Actions.Add_digit: {
      if (state.currentNumber === 0 && action.payload.value === 0) {
        return {
          ...state,
          lastPressed: "digit",
        };
      }

      if (state.lastPressed !== "digit") {
        return {
          ...state,
          currentNumber: action.payload.value,
          lastPressed: "digit",
          history: state.history + action.payload.value,
        };
      }

      return {
        ...state,
        currentNumber:
          state.currentNumber === 0 && state.lastPressed !== "digit"
            ? action.payload.value
            : state.currentNumber.toString() + action.payload.value,
        lastPressed: "digit",
        history: state.history + action.payload.value,
      };
    }

    case Actions.Add_Operator: {
      if (state.currentNumber !== null && state.previousNumber !== null) {
        const evaluated = Evaluate(
          state.previousNumber,
          state.operator,
          state.currentNumber
        );

        return {
          ...state,
          previousNumber: evaluated,
          currentNumber: evaluated,
          operator: action.payload.value,
          lastPressed: "operator",
          history: state.history + " " + action.payload.value + " ",
        };
      }
      return {
        ...state,
        previousNumber: state.currentNumber,
        operator: action.payload.value,
        lastPressed: "operator",
        history: state.history + " " + action.payload.value + " ",
      };
    }

    case Actions.Calculate: {
      const evaluated = Evaluate(
        state.previousNumber,
        state.operator,
        state.currentNumber
      );

      if (state.lastPressed === "operator") {
        return state;
      }

      if (state.lastPressed === "equals") {
        const storedEvaluate = Evaluate(
          state.currentNumber,
          state.operator,
          state.store
        );
        return {
          ...state,
          currentNumber: storedEvaluate,
          lastPressed: "equals",
        };
      }

      return {
        ...state,
        previousNumber: null,
        currentNumber: evaluated,
        store: state.currentNumber,
        lastPressed: "equals",
      };
    }

    case Actions.Add_Decimal: {
      if (state.currentNumber.toString().includes(".")) {
        return state;
      }
      return {
        ...state,
        currentNumber:
          state.currentNumber.toString() + action.payload.value.toString(),
      };
    }

    case Actions.Delete: {
      console.log("deleted 1 digit");
    }

    case Actions.Clear: {
      return {
        currentNumber: 0,
        previousNumber: null,
        operator: null,
        lastPressed: null,
        history: "",
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
    store: null,
    history: "",
  });

  let fsLarge = useMemo(() => {
    if (display.currentNumber.toString().length > 10) {
      return "fs-mid";
    } else {
      return "fs-large";
    }
  }, [display.currentNumber]);

  return (
    <div className="App">
      <div className="CalcContainer">
        <div className="Screen">
          <span className="fs-small display-block mg-bottom-large">
            {display.history}
          </span>
          <span className={fsLarge}>{Format(display.currentNumber)}</span>
        </div>
        <div className="ButtonContainer">
          <div className="Number">
            <button onClick={() => dispatch({ type: Actions.Clear })}>
              AC
            </button>
            <button onClick={() => dispatch({ type: Actions.Delete })}>
              DEL
            </button>
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
