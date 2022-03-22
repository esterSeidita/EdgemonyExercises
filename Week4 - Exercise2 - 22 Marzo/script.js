const q = (selector) => document.querySelector(selector);

let firstOperator = q("#firstOp");
let operation = q("#operation");
let secondOperator = q("#secondOp");
const resultBtn = q("#resultBtn");
const resultDiv = q(".resultDiv");

const calculator = (firstOperator, operation, secondOperator) => {
  let result;
  //   console.log(firstOperator - secondOperator);
  if (operation === "+") result = firstOperator + secondOperator;
  else if (operation === "-") result = firstOperator - secondOperator;
  else if (operation === "/") result = firstOperator / secondOperator;
  else if (operation === "*") result = firstOperator * secondOperator;
  return result;
};

resultBtn.addEventListener("click", () => {
  const first = parseInt(firstOperator.value);
  const op = operation.value;
  const second = parseInt(secondOperator.value);
  //   let time = 10;

  //   let int = setInterval(() => {
  //     if (time === 0) {
  //       clearInterval(int);
  //     }
  //     resultDiv.textContent = `Il risultato verrà mostrato tra: ${time}`;
  //     time--;
  //   }, 1000);

  //   resultDiv.textContent = `Il risultato è: ${calculator(first, op, second)}`;

  setTimeout(() => {
    resultDiv.textContent = `Il risultato è: ${calculator(first, op, second)}`;
  }, 10000);
});

//   resultDiv.textContent = `Il risultato è: ${calculator(first, op, second)}`;
//   console.log(calculator(first, op, second));
