import { sum, subtraction, multiplication, division } from './operations.js';

const root = document.querySelector('html');

const toolbarThemes = document.querySelector('.toolbar-option.themes');
const toolbarClear = document.querySelector('.toolbar-option.clear');
const themeList = document.querySelector('.toolbar__themes');

toolbarThemes.addEventListener('click', event => {
  event.preventDefault();
  
  themeList.classList.toggle('open');
});

toolbarClear.addEventListener('click', event => {
  event.preventDefault();
  
  const screen = document.querySelectorAll('#screen span');
  screen.forEach(item => {
    if (item.innerHTML != '') {
      item.innerHTML = '';
    }
  });
});

const themeListItems = document.querySelectorAll('.toolbar__themes li');
themeListItems.forEach(theme => {
  theme.addEventListener('click', item => {
    root.classList.replace(root.className, item.target.className);
    themeList.classList.remove('open');
  })
});

// Handle screen
const currentNumber = document.querySelector('#screen .screen__current');
const stagedOperation = document.querySelector('#screen .screen__staged');
function showCurrentNumber(number) {
  currentNumber.innerHTML += number;
}
function showStagedOperation() {
  stagedOperation.innerHTML += currentNumber.textContent;
  currentNumber.innerHTML = '';
}

// Handle buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
numberButtons.forEach(number => {
  number.addEventListener('click', (e) => {
    showCurrentNumber(e.target.textContent);
  });
});

// Handle calc
let firstNumber = 0, lastNumber = 0, operationSymbol = '';

operationButtons.forEach(operation => {
  operation.addEventListener('click', (e) => {
    const operator = e.target.textContent;

    if (operator !== '=' && currentNumber.innerHTML !== '') {
      firstNumber = parseInt(currentNumber.textContent);
      showCurrentNumber(operator);
      showStagedOperation();
      operationSymbol = stagedOperation.textContent.slice(stagedOperation.textContent.length - 1);
    }

    if (operator === '=' && currentNumber.innerHTML !== '' && firstNumber !== 0) {
      lastNumber = parseInt(currentNumber.textContent);

      switch (operationSymbol) {
        case "+":
          currentNumber.innerHTML = sum(firstNumber, lastNumber);
          break;
      
        case "-":
          currentNumber.innerHTML = subtraction(firstNumber, lastNumber);
          break;
        
        case "*":
          currentNumber.innerHTML = multiplication(firstNumber, lastNumber);
          break;
        
        case "/":
          currentNumber.innerHTML = division(firstNumber, lastNumber);
          break;
      }

      stagedOperation.innerHTML = '';
    }
  });
});
