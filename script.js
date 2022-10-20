
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

  operators.forEach(operator => operator.addEventListener('click', (e) => {
    handleOperators(e.target.textContent); 
  }))

  allClear.addEventListener('click', clear);

  undo.addEventListener('click', deleteLastItem);

  equals.addEventListener('click', calculate)
}

// functions
const handleNumbers = (number) => {
  if (currentValue.length < 12) {
    if (number === '0' && currentValue === '0') return;
    if (number > '0' && currentValue === '0') currentValue = '';
    if (number === '.' && currentValue.includes('.')) return;
    if (number === '.' && currentValue === '') {
      return currentValue = '0.';
    }
    currentValue += number;
  }
}

const handleOperators = (op) => {
  operator = op;
  
  if (previousValue === '' && currentValue === '') return;
  if (operator !== '' && currentOperand.textContent === '') {  
    // checks if an operator already exist and changes it for the new operator without lose the previous value.
    previousOperand.textContent = previousValue + ' ' + operator;
  }
  if (currentOperand.textContent === '') return;
  previousOperand.textContent = currentValue + ' ' + operator;
  previousValue = currentValue;
  currentValue = '';
  currentOperand.textContent = currentValue;
}

const clear = () => {
  currentOperand.textContent = '';
  previousOperand.textContent = '';
  operator = '';
  currentValue = '';
  previousValue = '';
}

const deleteLastItem = () => {
  if (typeof currentValue != 'string') return;
  currentValue = currentValue.slice(0, -1);
  currentOperand.textContent = currentValue;
}

const calculate = () => {
  currentValue = Number(currentValue);
  previousValue = Number(previousValue);
  if (operator === '+') {
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentOperand.textContent = currentValue += previousValue;
  } else if (operator === 'x') {
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentOperand.textContent = currentValue *= previousValue;
  } else if (operator === '÷') {
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentValue = previousValue / currentValue;
    currentOperand.textContent = currentValue;
  } else if (operator === '-') {
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentValue = previousValue - currentValue;
    currentOperand.textContent = currentValue;
  } 
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