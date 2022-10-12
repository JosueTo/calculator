
// const add = (operand1, operand2) => operand1 + operand2;
// const subtract = (operand1, operand2) => operand1 - operand2;
// const multiply = (operand1, operand2) => operand1 * operand2;
// const divide = (operand1, operand2) => operand1 / operand2;

// let displayValue = 0;


// const operate = (num1, operator, num2) => {
//   if (operator === '+') {
//     return add(num1, num2);
//   } else if (operator === '-') {
//     return subtract(num1, num2);
//   } else if (operator === '*') {
//     return multiply(num1, num2);
//   } else if (operator === '/') {
//     return divide(num1, num2);
//   }
// }

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allClear = document.querySelector('#all-clear');
const undo = document.querySelector('.delete');
const equals = document.querySelector('.equals');
const previousOperand = document.querySelector('.previous-operation');
const currentOperand = document.querySelector('.current-operation');

let currentValue = '';
let previousValue = '';
let operator = '';

// main function
const calculator = () => {
  // events
  numbers.forEach(number => number.addEventListener('click', (e) => {
      handleNumbers(e.target.textContent);
      currentOperand.textContent = currentValue;
  }))

  allClear.addEventListener('click', clear);

  undo.addEventListener('click', deleteLastItem);
}

// functions
const handleNumbers = (number) => {
  if (currentValue.length < 12) {
    if (number === '0' && currentValue === '0') return;
    if (number === '.' && currentValue.includes('.')) return;
    if (number === '.' && currentValue === '') {
      return currentValue = '0.';
    }
    currentValue += number;
  }
}

const clear = () => {
  currentOperand.textContent = '';
  previousOperand.textContent = '';
  operator = '';
  currentValue = '';
}

const deleteLastItem = () => {
  currentValue = currentValue.slice(0, -1);
  currentOperand.textContent = currentValue;
}

calculator();

// main function 
// const calculator = () => {
//   // events
//   numbers.forEach(number => {
//     number.addEventListener('click', () => {
//       currentOperation.textContent += number.textContent;
//     })
//   })
// }