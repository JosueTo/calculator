
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
  }))

  operators.forEach(operator => operator.addEventListener('click', (e) => {
    handleOperators(e.target.textContent);
  }))

  allClear.addEventListener('click', clear);

  undo.addEventListener('click', deleteLastItem);

  equals.addEventListener('click', calculate)

  window.addEventListener('keydown', keyboardSupport)
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
    currentOperand.textContent = currentValue;
  }
}

const handleOperators = (op) => {
  /* perform the calculation without the equals key if the user 
  wants to string several operations. This if statement goes before assigning
  a new operator to allow the previous operation to be executed before 
  assigning a new operator, otherwise the previous operation would be
  performed with whatever new operator we use, which would be wrong.
  */
  if (currentValue != '' && previousValue != '' && operator != '') calculate();
  
  operator = op;
  
  if (previousValue === '' && currentValue === '') return;
  /* checks if an operator already exist and changes it for the new operator 
  without lose the previous value */
  if (operator !== '' && currentOperand.textContent === '') {  
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
  if(currentValue === '' || previousValue === '') return; // if there's not two values: do nothing
  currentValue = Number(currentValue);
  previousValue = Number(previousValue);
  if (operator === '+') {
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentOperand.textContent = currentValue += previousValue;
  } else if (operator === 'x') {
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentOperand.textContent = currentValue *= previousValue;
  } else if (operator === '') {
    if (currentValue === 0) return currentOperand.textContent = 'Really?';
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentValue = previousValue / currentValue;
    currentOperand.textContent = currentValue;
  } else if (operator === '-') {
    previousOperand.textContent = previousValue + ' ' + operator + ' ' + currentValue;
    currentValue = previousValue - currentValue;
    currentOperand.textContent = currentValue;
  } 
}

const keyboardSupport = (e) => {
  if (e.key >= 0 && e.key <= 9) handleNumbers(e.key);
  if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '÷') 
  handleOperators(convertKeyboardOperators(e.key));
  if (e.key === '=' || e.key === 'Enter') calculate();
  if (e.key === 'Backspace') deleteLastItem();
  if (e.key === 'Escape') clear();
}

const convertKeyboardOperators = (operator) => {
  if (operator === '*') return 'x';
  if (operator === '/') return '÷';
  if (operator === '+') return '+';
  if (operator === '-') return '-';
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