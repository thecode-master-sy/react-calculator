import { Actions } from "../App.jsx";

const Number = ({ dispatch, payload }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: payload.value === "." ? Actions.Add_Decimal : Actions.Add_digit,
          payload: { value: payload.value },
        })
      }
      className={`gray ${payload.value == 0 && "spanTwo"}`}
    >
      {payload.value}
    </button>
  );
};

export default Number;
