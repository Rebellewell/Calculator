var calcContainer = document.getElementById('calc-container');
var calcScreen = document.getElementById('calc-screen');
var number = document.getElementsByClassName('number');
var operator = document.getElementsByClassName('operator');
var decimal = document.getElementsByClassName('decimal');

calcContainer.addEventListener('click', buttonHandler());

function buttonHandler() {
  if (!event.target.matches('button')) {
    return;
  } else if (event.target.matches('number')) {
    handleNumber(number);
  } else if (event.target.matches('operator')) {
    handleOperator(operator);
  } else if (event.target.matches('decimal')) {
    handleDecimal(decimal);
  } else if (event.target.matches('clear')) {
    clearScreen();
  }
}

function handleNumber(number) {
  addToScreen(number);
}

function handleOperator(operator) {
  addToScreen(operator);
}

function handleDecimal(decimal) {
  addToScreen(decimal);
}

function clearScreen() {
  calcScreen.innerText = '';
}

function addToScreen(content) {
  calcScreen.innerText = button.value;
}



// // go to the DOM and get the current value of the screen element
// function getScreen() {}
// // take a string "content" and update the screen element in the DOM to hold the value of "content" at the end of its current value
// function addToScreen(content) {}
// // replace the value of the screen element in the DOM with whatever is in "content"
// function setScreen(content) {}