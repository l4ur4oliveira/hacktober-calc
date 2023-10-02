import { sum, subtraction, multiplication, division, log, power, factorial } from './operations.js';

const root = document.querySelector('html');

const toolbarThemes = document.querySelector('.toolbar-option.themes');
const toolbarClear = document.querySelector('.toolbar-option.clear');
const toolbarDelete = document.querySelector('.toolbar-option.delete');
const themeList = document.querySelector('.toolbar__themes');
const toolbarCopy = document.querySelector('.toolbar-option.copy');

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
  enableMathOperators();
  const screen = document.querySelectorAll('#screen span');
  screen.forEach(item => {
    if (item.innerHTML != '') {
      item.innerHTML = '';
    }
  });
});

toolbarDelete.addEventListener('click', event => {
  event.preventDefault();
  enableMathOperators();
  if (currentNumber.innerHTML != '') {
    currentNumber.innerHTML = currentNumber.innerHTML.slice(0,-1);
  }
});


toolbarCopy.addEventListener('click', event => {
  event.preventDefault();
  if (currentNumber.innerHTML != '') {
    navigator.clipboard.writeText(currentNumber.innerHTML);
  }
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
    if (resetInput) {
      currentNumber.innerHTML = '';
      resetInput = false;
    }
    
    showCurrentNumber(e.target.textContent);
  });
});

function disableMathOperators() {
  const stagedOperation = document.querySelectorAll('.operators button');
  stagedOperation.forEach(btn => {
    btn.disabled=true;
  });
}

function enableMathOperators() {
  const stagedOperation = document.querySelectorAll('.operators button');
  stagedOperation.forEach(btn => {
    btn.disabled=false;
  });
}

// keyboard press for number and clear(backspcae)
document.addEventListener("keydown", function (e) {
  if (e.key == parseInt(e.key)) {
    showCurrentNumber(e.key);
  } else if (e.key === 'Backspace') {
    enableMathOperators();
    const screen = document.querySelectorAll('#screen span');
    screen.forEach(item => {
      if (item.innerHTML != '') {
        item.innerHTML = '';
      }
    })
  }
});

// Handle calc
let firstNumber = 0, lastNumber = 0, operationSymbol = '', resetInput = false;

operationButtons.forEach(operation => {
  operation.addEventListener('click', (e) => {
    const operator = e.target.textContent;

    if (operator === '=') {
      if (currentNumber.textContent.length > 3 && currentNumber.textContent.slice(0,3) === 'log') {
        currentNumber.innerHTML = log(parseInt(currentNumber.textContent.slice(3)));
        return;
      } else if (currentNumber.textContent.length >= 2 && currentNumber.textContent[currentNumber.textContent.length - 1] === '!') {
        const num = parseInt(currentNumber.textContent.slice(0, currentNumber.textContent.length - 1));
        currentNumber.textContent = factorial(num);
      } else if (currentNumber.innerHTML !== '' && firstNumber !== 0) {
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
          case "^":
            currentNumber.innerHTML = power(firstNumber,lastNumber);
            console.log("HELLO")
            break;
        }

        enableMathOperators();
        stagedOperation.innerHTML = '';
        resetInput = true;
      }
    } else {
      if (currentNumber.innerHTML !== '') {
        console.log(currentNumber.textContent);
        if (currentNumber.innerHTML.includes('.')) {
          firstNumber = parseFloat(currentNumber.textContent);
        } else {
          firstNumber = parseInt(currentNumber.textContent);
        }
        showCurrentNumber(operator);
        showStagedOperation();
        
        operationSymbol = stagedOperation.textContent.slice(stagedOperation.textContent.length - 1);
      } else {
        stagedOperation.innerHTML = stagedOperation.textContent.slice(0, -1) + operator;
        operationSymbol = operator;
      }
    }
  });
});
