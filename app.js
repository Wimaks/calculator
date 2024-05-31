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

  //* Мат операции
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

  //* Операция "%"
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

  //* Набор 1-го числа
  function incFirstNumber() {
    firstNumber += event.target.innerText;
    output.innerText = firstNumber;
    if (output.innerText.length > 10) {
      firstNumber = output.innerText.substr(0, 10);
      output.innerText = output.innerText.substr(0, 10);
    }
  }

  //* Набор 2-го числа
  function incSecondNumber() {
    secondNumber += event.target.innerText;
    output.innerText = secondNumber;
    if (output.innerText.length > 10) {
      secondNumber = output.innerText.substr(0, 10);
      output.innerText = output.innerText.substr(0, 10);
    }
  }

  //* Проверка какой знак нажат и выполнение определенной операции
  function checkSigns() {
    switch (sign) {
      case "+":
        result = addition(firstNumber, secondNumber);
        break;
      case "-":
        result = substaction(firstNumber, secondNumber);
        break;
      case "X":
        result = multiplication(firstNumber, secondNumber);
        break;
      case "/":
        result = division(firstNumber, secondNumber);
        break;
    }
    output.innerText = result;
    addMemory();
  }

  //* Нажатия на кнопки чисел
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

  //* Нажатия на кнопки мат операций
  for (const operation of operations) {
    operation.addEventListener("click", (event) => {
      let key = event.target.innerText;
      switch (key) {
        case "%":
          percentOperations();
          break;
        case "=":
          switch (result) {
            case "":
              checkSigns();
              break;

            default:
              firstNumber = result;
              checkSigns();
              break;
          }
          break;

        default:
          sign = key;
          break;
      }
      if (output.innerText.length > 10) {
        output.innerText = output.innerText.substr(0, 9) + "e";
      }
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

  //* Очистка данных калькулятора
  function clearOutput() {
    output.innerText = "";
    firstNumber = "";
    secondNumber = "";
    sign = "";
    result = "";
  }

  //* + очистка журнала памяти
  function clearAll() {
    clearOutput();
    ul.innerText = "";
  }

  buttonClear.addEventListener("click", clearOutput);
  buttonClearAll.addEventListener("click", clearAll);
});
