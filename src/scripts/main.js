import Operations from "./operations.js";
import { handleToolbarThemes, handleToolbarClear, handleToolbarDelete, handleToolbarCopy } from "./toolbar.js";

const root = document.querySelector("html");
const themeList = document.querySelector(".toolbar__themes");

const currentNumber = document.querySelector("#screen .screen__current");
const stagedOperation = document.querySelector("#screen .screen__staged");

handleToolbarThemes(root, themeList);
handleToolbarClear();
handleToolbarDelete(currentNumber);
handleToolbarCopy(currentNumber);

// Handle screen
function showCurrentNumber(number) {
  currentNumber.innerHTML += number;
}

function showStagedOperation() {
  stagedOperation.innerHTML += currentNumber.textContent;
  currentNumber.innerHTML = "";
}

// Handle buttons
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
numberButtons.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (resetInput) {
      currentNumber.innerHTML = "";
      resetInput = false;
    }

    showCurrentNumber(e.target.textContent);
  });
});

/** TODO: Handle keyboard behavior
 * Does not work with 60% keyboard
 * For example:
 * - Shift + =/+ or Shift + 8/*
 * - Fn + Del
 */
// document.addEventListener("keydown", function (e) {
//   if (e.key == parseInt(e.key)) {
//     showCurrentNumber(e.key);
//   } else if (e.key === "Backspace") {
//     enableMathOperators();
//     const screen = document.querySelectorAll("#screen span");
//     screen.forEach((item) => {
//       if (item.innerHTML != "") {
//         item.innerHTML = "";
//       }
//     });
//   }
// });

// Handle calc
const operation = new Operations();
let firstNumber = 0,
  lastNumber = 0,
  operationSymbol = "",
  resetInput = false;


let isDegreeMode = true;

window.toggleAngleMode = () => {
  isDegreeMode = !isDegreeMode;
  const modeBtn = document.querySelector("#modeBtn");
  modeBtn.textContent = isDegreeMode ? "Deg" : "Rad";
};

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function toDegrees(rad) {
  return (rad * 180) / Math.PI;
}

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", (e) => {
    const operator = e.target.textContent;

    if (currentNumber.innerHTML === "") {
      stagedOperation.innerHTML = stagedOperation.textContent.slice(0, -1) + operator;
      operationSymbol = operator;
      return;
    }

    firstNumber = currentNumber.innerHTML.includes(".")
      ? parseFloat(currentNumber.textContent)
      : parseInt(currentNumber.textContent);

    showCurrentNumber(operator);
    showStagedOperation();

    operationSymbol = operator;
  });
});

// --- Math Operations ---
window.logarithm = () => {
  currentNumber.innerHTML = operation.log(parseInt(currentNumber.textContent));
};

window.factorial = () => {
  const num = parseInt(currentNumber.textContent);
  currentNumber.textContent = operation.factorial(num);
};

// --- Trigonometric functions ---
window.sin = () => {
  const num = parseFloat(currentNumber.textContent);
  const val = isDegreeMode ? operation.sin(toRadians(num)) : operation.sin(num);
  currentNumber.textContent = val.toFixed(5);
};

window.cos = () => {
  const num = parseFloat(currentNumber.textContent);
  const val = isDegreeMode ? operation.cos(toRadians(num)) : operation.cos(num);
  currentNumber.textContent = val.toFixed(5);
};

window.tan = () => {
  const num = parseFloat(currentNumber.textContent);
  const val = isDegreeMode ? operation.tan(toRadians(num)) : operation.tan(num);
  currentNumber.textContent = val.toFixed(5);
};

window.asin = () => {
  const num = parseFloat(currentNumber.textContent);
  let val = operation.asin(num);
  if (isDegreeMode) val = toDegrees(val);
  currentNumber.textContent = val.toFixed(5);
};

window.acos = () => {
  const num = parseFloat(currentNumber.textContent);
  let val = operation.acos(num);
  if (isDegreeMode) val = toDegrees(val);
  currentNumber.textContent = val.toFixed(5);
};

window.atan = () => {
  const num = parseFloat(currentNumber.textContent);
  let val = operation.atan(num);
  if (isDegreeMode) val = toDegrees(val);
  currentNumber.textContent = val.toFixed(5);
};

window.showResult = () => {
  if (currentNumber.innerHTML !== "" && firstNumber !== 0) {
    lastNumber = currentNumber.innerHTML.includes(".")
      ? parseFloat(currentNumber.textContent)
      : parseInt(currentNumber.textContent);

    switch (operationSymbol) {
      case "+":
        currentNumber.innerHTML = operation.sum(firstNumber, lastNumber);
        break;

      case "-":
        currentNumber.innerHTML = operation.subtraction(firstNumber, lastNumber);
        break;

      case "*":
        currentNumber.innerHTML = operation.multiplication(firstNumber, lastNumber);
        break;

      case "/":
        currentNumber.innerHTML = operation.division(firstNumber, lastNumber);
        break;

      case "^":
        currentNumber.innerHTML = operation.power(firstNumber, lastNumber);
        break;
    }

    stagedOperation.innerHTML = "";
    resetInput = true;
  }
};
