var calcContainer = document.getElementById('calc-container');
var calcScreen = document.getElementById('calc-screen');
var number = document.getElementsByClassName('number');
var operator = document.getElementsByClassName('operator');
var decimal = document.getElementsByClassName('decimal');
var flags = {
  canDec: true,
  freshEval: false
};
var currNum = '';
var currOp = '';
var expression = [];

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
  } else if (event.target.matches('#pos-neg')) {
    handleNeg();
  }
  console.log(expression);
}

document.addEventListener('keyup', keyHandler);

function keyHandler(event) {
  if (event.keyCode === 190 || event.keyCode === 110) {
    handleDecimal('.');
  } else if ((event.keyCode <= 57 && event.keyCode >= 48) || (event.keyCode <= 105 && event.keyCode >= 96)) {
    handleNumber(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    handleOperator(event.key);
  } else if (event.key === 'Backspace') {
    clearScreen();
  } else if (event.key === 'Enter' || event.key === '=') {
    handleCalc(event.key);
  }
}

function handleNumber(number) {
  if(currOp) {
    expression.push(currOp);
    currOp = '';
  }
  if(flags.freshEval) {
    clearScreen();
    flags.freshEval = false;
    expression = [];
    addToScreen(number);
    currNum = number;
  } else if(calcScreen.innerText === '0') {
    setScreen(number);
    currNum = number;
  } else {
    addToScreen(number);
    currNum += number;
  }
}

function handleOperator(operator) {
  if(currNum) {
    expression.push(currNum);
    currNum = '';
  } 
  if(endsWithOp(calcScreen.innerText)) {
    // replace screen with same as before, just with the last operator replaced with this new one
    var original = calcScreen.innerText.slice(0, -1);
    setScreen(original + operator);
  } else if(canOp()) {
    addToScreen(operator);
    flags.canDec = true;
    flags.freshEval = false;
  }
  currOp = operator;
}

function handleDecimal(decimal) {
  if(flags.canDec) {
    if(flags.freshEval) {
      clearScreen();
    }
    addToScreen('.');
    flags.canDec = false;
    flags.freshEval = false;
    currNum += '.';
  }
}

function handleNeg() {
  if (currNum) {
    console.log(currNum);
    
    if(currNum > 0){
      currNum = 0 - currNum;
      setScreen(expression.join('') + "(" + currNum + ")");
    } else if(currNum < 0) {
      currNum = 0 - currNum;
      setScreen(expression.join('') + currNum);
    }
  }
}

function handleCalc() {
  if(currNum) {
    expression.push(currNum);
    currNum ='';
  }
  if(calcScreen.innerText === '') {
    return setScreen(0);
  }
  for(var i = 0; i < expression.length; i += 2) {
    if(+expression[i] < 0) {
      expression[i] = '(' + expression[i] + ')';
    }
  }
  var expressionStr = expression.join('');
  var result = eval(expressionStr);
  setScreen(result);
  expression = [result];
  flags.freshEval = true;
  flags.canDec = true;
  expression = [];
  currNum = result;
}

function clearScreen() {
    calcScreen.innerText = '';
    flags.canDec = true;
    currNum = '';
    expression = [];
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

// Cannot use operator on empty screen
function canOp() {
  if(calcScreen.innerText === '' || calcScreen.innerText === '.') {
    return false;
  } else {
    return true;
  }
}