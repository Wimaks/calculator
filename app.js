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
  let result = "";

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

  function percentOperations() {
    if (result !== "") {
      result = result / 100;
      output.innerText = result;
      sign = event.target.innerText;
      addMemory();
    } else if (sign == "+" || sign == "-" || sign == "") {
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

  function incFirstNumber() {
    firstNumber += event.target.innerText;
    output.innerText = firstNumber;
  }

  function incSecondNumber() {
    secondNumber += event.target.innerText;
    output.innerText = secondNumber;
  }

  function doOperations() {
    if (event.target.innerText == "%") {
      percentOperations();
    } else if (event.target.innerText == "=") {
      if (result !== "") {
        if (secondNumber === "") {
          secondNumber = result;
          output.innerText = result;
          addMemory();
        } else {
          firstNumber = result;
          if (sign == "+") {
            result = addition(firstNumber, secondNumber);
          } else if (sign == "-") {
            result = substaction(firstNumber, secondNumber);
          } else if (sign == "X") {
            result = multiplication(firstNumber, secondNumber);
          } else if (sign == "/") {
            result = division(firstNumber, secondNumber);
          }
          output.innerText = result;
          addMemory();
        }
      } else {
        if (sign == "+") {
          result = addition(firstNumber, secondNumber);
        } else if (sign == "-") {
          result = substaction(firstNumber, secondNumber);
        } else if (sign == "X") {
          result = multiplication(firstNumber, secondNumber);
        } else if (sign == "/") {
          result = division(firstNumber, secondNumber);
        }
        output.innerText = result;
        addMemory();
      }
    } else {
      sign = event.target.innerText;
    }
    if (output.innerText.length > 10) {
      output.innerText = output.innerText.substr(0, 9) + "e";
    }
  }

  for (const number of numbers) {
    number.addEventListener("click", (event) => {
      if (output.innerText.length < 10) {
        if (secondNumber === "" && sign === "") {
          incFirstNumber();
        } else if (
          firstNumber !== "" &&
          secondNumber !== "" &&
          result !== "" &&
          sign !== ""
        ) {
          firstNumber = result;
          secondNumber = "";
          result = "";
          incSecondNumber();
        } else {
          incSecondNumber();
        }
      } else {
        if (sign !== "" && secondNumber !== "") {
          secondNumber = "";
          incSecondNumber();
        } else if (sign !== "" && secondNumber === "") {
          incSecondNumber();
        }
      }
    });
  }

  for (const operation of operations) {
    operation.addEventListener("click", (event) => {
      doOperations();
    });
  }

  const addMemory = function () {
    let li = document.createElement("li");
    li.classList.add("memory__list-item");

    if (sign == "%") {
      li.textContent =
        result * 100 + " " + "/ " + "100" + sign + " " + " = " + result;
    } else {
      li.textContent =
        firstNumber + " " + sign + " " + secondNumber + " = " + result;
    }

    ul.appendChild(li);
  };

  function clearOutput() {
    output.innerText = "";
    firstNumber = "";
    secondNumber = "";
    sign = "";
    result = "";
  }

  function clearAll() {
    clearOutput();
    ul.innerText = "";
  }

  buttonClear.addEventListener("click", clearOutput);
  buttonClearAll.addEventListener("click", clearAll);
});
