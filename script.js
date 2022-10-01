
const add = (operand1, operand2) => operand1 + operand2;
const subtract = (operand1, operand2) => operand1 - operand2;
const multiply = (operand1, operand2) => operand1 * operand2;
const divide = (operand1, operand2) => operand1 / operand2;

let displayValue = 0;


const operate = (num1, operator, num2) => {
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === '*') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    return divide(num1, num2);
  }
}