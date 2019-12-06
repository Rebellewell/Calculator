var calcContainer = document.getElementById('calc-container');
var calcScreen = document.getElementById('calc-screen');
var number = document.getElementsByClassName('number');
var operator = document.getElementsByClassName('operator');
var decimal = document.getElementsByClassName('decimal');
var flags = {
  canDec: true
};

calcContainer.addEventListener('click', buttonHandler);

function buttonHandler(event) {
  if (!event.target.matches('button')) {
    return;
  } else if (event.target.matches('.number')) {
    handleNumber(event.target.value);
  } else if (event.target.matches('.operator')) {
    handleOperator(event.target.value);
  } else if (event.target.matches('.decimal')) {
    handleDecimal(event.target.value);
  } else if (event.target.matches('#clear')) {
    clearScreen();
  } else if (event.target.matches('#equals')) {
    handleCalc();
  } else if (event.target.matches('+/-')) {
    handleNeg();
  }
}

// document.addEventListener('keyup', keyHandler)

function keyHandler(event) {
  if (event.key === '.') {
    handleDecimal(event);
  } else if (event.key >= 0 && event.key <= 9) {
    handleNumber(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    handleOperator(event.key);
  } else if (event.key === 'Backspace') {
    clearScreen();
  } else if (event.key === 'Enter' || '=') {
    handleCalc(event.key);
  } 
}

function handleNumber(number) {
  addToScreen(number);
}

function handleOperator(operator) {
  if(endsWithOp(calcScreen.innerText)) {
    // replace screen with same as before, just with the last operator replaced with this new one
    var original = calcScreen.innerText.slice(0, -1);
    setScreen(original + operator);
  } else {
    // just add operator to end of screen
    addToScreen(operator);
  }
  flags.canDec = true;
}

function handleDecimal(decimal) {
  if(flags.canDec) {
    addToScreen('.');
    flags.canDec = false;
  }
}

function handleNeg() {
  var currNum = calcScreen.slice(-1);
  var negNum = calcScreen.replace(currNum, '-' + currNum);
  addToScreen(negNum);
}

function handleCalc() {
  var result = eval(calcScreen.innerText);
  setScreen(result);
}

function clearScreen() {
  calcScreen.innerText = '';
  flags.canDec = true;
}

function addToScreen(content) {
  calcScreen.innerText += content;
}

function setScreen(content) {
  calcScreen.innerText = content;
}

function endsWithOp () {
  var lastChar = calcScreen.innerText.slice(-1);
  // returns bool whether the last character is included in list of operators
  return ['+', '-', '*', '/'].includes(lastChar);
}



// // go to the DOM and get the current value of the screen element
// function getScreen() {}
// // take a string "content" and update the screen element in the DOM to hold the value of "content" at the end of its current value
// function addToScreen(content) {}
// // replace the value of the screen element in the DOM with whatever is in "content"
// function setScreen(content) {}