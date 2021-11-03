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

// Handle buttons
function showCurrentNumber(number) {
  const currentNumber = document.querySelector('#screen .screen__current');
  currentNumber.innerHTML += number;
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
numberButtons.forEach(number => {
  number.addEventListener('click', () => {
    showCurrentNumber(number.textContent);
  });
});
