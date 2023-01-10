export const Evaluate = (firstNumber, operator, secondNumber) => {
  if (operator === "+") {
    return Number(firstNumber) + Number(secondNumber);
  }

  if (operator === "-") {
    return Number(firstNumber) - Number(secondNumber);
  }

  if (operator === "x") {
    return Number(firstNumber) * Number(secondNumber);
  }

  if (operator === "÷") {
    return Number(firstNumber) / Number(secondNumber);
  }

  return "";
};
