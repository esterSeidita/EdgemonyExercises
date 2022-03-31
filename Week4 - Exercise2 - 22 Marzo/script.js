const q = (selector) => document.querySelector(selector);
const qAll = (selector) => document.querySelectorAll(selector);

const numbers = qAll(".number");
const operations = qAll(".operation");
const screen = q(".screen");
const resultBtn = q(".result");
const clearBtn = q(".clear");
const backBtn = q(".back");

backBtn.addEventListener("click", () => {
  const screenToArray = screen.textContent.split("");
  screenToArray.pop();
  screen.textContent = screenToArray.join("");
})

clearBtn.addEventListener("click", () => {
  undo();
})

numbers.forEach(number => {
  number.addEventListener("click", () => {
    const value = number.textContent;
    screen.textContent += value;  
  }) 
}); //end numbers foreach..

operations.forEach(operation => {
  operation.addEventListener("click", () =>{
    const opValue = operation.textContent;
    screen.textContent += opValue;
  }) 
})//end operations foreach

resultBtn.addEventListener("click", () => {
  const operationString = screen.textContent;

  const array = operationString.split(/(?=[-+/*])|(?<=[-+/*])/g);
  const firstNum = parseFloat(array[0]);

  const operation = array[1];
  const secondNum = parseFloat(array[2]);
  
  // if(operation==='+') screen.textContent= firstNum + secondNum;

  screen.textContent = eval(`${firstNum}${operation}${secondNum}`);
})

function undo () {
  screen.textContent="";
}