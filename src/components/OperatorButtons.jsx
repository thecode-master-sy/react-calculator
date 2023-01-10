import { Actions } from "../App.jsx";

const Operator = ({ dispatch, payload }) => {
  return (
    <button
      onClick={() => {
        dispatch({
          type:
            payload.value === "=" ? Actions.Calculate : Actions.Add_Operator,
          payload: { value: payload.value },
        });
      }}
      className="orange"
    >
      {payload.value}
    </button>
  );
};

export default Operator;
