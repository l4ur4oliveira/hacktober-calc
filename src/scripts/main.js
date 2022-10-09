import { sum, subtraction, multiplication, division } from './operations.js';

const root = document.querySelector('html');

const toolbarThemes = document.querySelector('.toolbar-option.themes');
const toolbarClear = document.querySelector('.toolbar-option.clear');
const themeList = document.querySelector('.toolbar__themes');

toolbarThemes.addEventListener('click', event => {
  event.preventDefault();
  themeList.classList.toggle('open');
});

document.addEventListener("mouseup", function (e) {
  const target = document.querySelector('.toolbar__themes.open');
  const toolbarThemes = document.querySelector('.toolbar-option.themes');

  if (!target) {
    return;
  }

  if (e.target.className !== toolbarThemes.className) {
    target.classList.remove("open");
  }
  return;
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

function disableMathOperators(){
  const stagedOperation = document.querySelector('.operators');
  console.log(stagedOperation)
  stagedOperation.setAttribute("disabled", true)
  console.log('disabled')
}

function enableMathOperators(){
  console.log('enable')
  const stagedOperation = document.querySelector('.operators');
  console.log(stagedOperation)
  stagedOperation.removeAttribute("disabled")
  console.log('disabled')
}

// keyboard press for number and clear(backspcae)
document.addEventListener("keydown", function (e) {
  if (e.key == parseInt(e.key)) {
    showCurrentNumber(e.key);
  } else if (e.key === 'Backspace') {
    const screen = document.querySelectorAll('#screen span');
    screen.forEach(item => {
      if (item.innerHTML != '') {
        item.innerHTML = '';
      }
    })
  }
});

// Handle calc
let firstNumber = 0, lastNumber = 0, operationSymbol = '';

operationButtons.forEach(operation => {
  operation.addEventListener('click', (e) => {
    const operator = e.target.textContent;
    disableMathOperators()

    if (operator !== '=' && currentNumber.innerHTML !== '') {
      if (currentNumber.innerHTML.includes('.')) {
        firstNumber = parseFloat(currentNumber.textContent);
      } else {
        firstNumber = parseInt(currentNumber.textContent);
      }
      showCurrentNumber(operator);
      showStagedOperation();
      operationSymbol = stagedOperation.textContent.slice(stagedOperation.textContent.length - 1);
    }

    if (operator === '=' && currentNumber.innerHTML !== '' && firstNumber !== 0) {
      enableMathOperators()
      if (currentNumber.innerHTML.includes('.')) {
        lastNumber = parseFloat(currentNumber.textContent);
      } else {
        lastNumber = parseInt(currentNumber.textContent);
      }

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