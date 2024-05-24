document.addEventListener("DOMContentLoaded", function () {
  let output = document.querySelector(".calculator__header__output");
  let numbers = document.querySelectorAll(".btn--number");
  let operations = document.querySelectorAll(".btn--operation");
  let buttonClear = document.querySelector(".btn--clear");
  let buttonClearAll = document.querySelector(".btn--clear-all");
  let ul = document.querySelector(".memory__list");
  let firstNumber = "";
  let secondNumber = "";
  let sign = "";
  let result;

  output.innerText = "";

  function addition(a, b) {
    return +a + +b;
  }

  function substaction(a, b) {
    return a - b;
  }

  function multiplication(a, b) {
    return a * b;
  }

  function division(a, b) {
    return a / b;
  }

  function percent() {
    if (sign == "+" || sign == "-") {
      if (secondNumber === "") {
        firstNumber = firstNumber / 100;
        output.innerText = firstNumber;
      } else {
        secondNumber = (secondNumber / 100) * firstNumber;
        output.innerText = secondNumber;
      }
    } else {
      secondNumber = secondNumber / 100;
      output.innerText = secondNumber;
    }
  }

  function clearOutput() {
    output.innerText = "";
    firstNumber = "";
    secondNumber = "";
    sign = "";
  }

  function clearAll() {
    clearOutput();
    ul.innerText = "";
  }

  for (const number of numbers) {
    number.addEventListener("click", (event) => {
      if (output.innerText.length < 10) {
        if (secondNumber === "" && sign === "") {
          firstNumber += event.target.innerText;
          output.innerText = firstNumber;
        } else {
          secondNumber += event.target.innerText;
          output.innerText = secondNumber;
        }
      } else {
        console.log("NO, PLEASE, NO!");
      }
    });
  }

  for (const operation of operations) {
    operation.addEventListener("click", (event) => {
      if (event.target.innerText == "%") {
        percent();
      } else if (event.target.innerText == "=") {
        if (sign == "+") {
          result = addition(firstNumber, secondNumber);
          output.innerText = result;
          addMemory();
        } else if (sign == "-") {
          result = substaction(firstNumber, secondNumber);
          output.innerText = result;
          addMemory();
        } else if (sign == "X") {
          result = multiplication(firstNumber, secondNumber);
          output.innerText = result;
          addMemory();
        } else if (sign == "/") {
          result = division(firstNumber, secondNumber);
          output.innerText = result;
          addMemory();
        }
      } else {
        sign = event.target.innerText;
      }
    });
  }

  const addMemory = function () {
    let li = document.createElement("li");
    li.classList.add("memory__list-item");

    li.textContent =
      firstNumber + " " + sign + " " + secondNumber + " = " + result;

    ul.appendChild(li);
  };

  buttonClear.addEventListener("click", clearOutput);
  buttonClearAll.addEventListener("click", clearAll);
});
