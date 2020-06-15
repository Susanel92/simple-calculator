const displayPanel = document.querySelector('.display');
let displayText = '';
let mathOperation;
let nr1End = false;
let nr1 = 0;
let nr2 = '';
let result = 0;

const displayResult = function () {

  displayText = result;

  displayPanel.textContent = displayText;
  displayText = '';
  nr1End = false;
  nr1 = 0;
  nr2 = '';
}

const count = function (number1, number2, operation) {

  //convert string type to number type
  number1 *= 1;
  number2 *= 1;

  if (operation === "/") {
    result = number1 / number2;
  } else if (operation === "X") {
    result = number1 * number2;
  } else if (operation === "-") {
    result = number1 - number2;
  } else if (operation === "+") {
    result = number1 + number2;
  }


  // rounds the result if there is a residue with 2 (or more) positions after 0
  if (result * 10 % 1 !== 0) {
    result = result.toFixed(2)
  }
  displayResult()
}

//saving user numbers under variables: nr1 & nr2
const getNumbers = function (clickedItem) {
  // console.log(clickedItem);
  if (result !== 0) {
    if (clickedItem === '/' ||
      clickedItem === '-' || clickedItem === '+' || clickedItem === 'X') {

      console.log('take result');
      nr1 = result;
      nr1End = true;

    } else {

      console.log('dont take result');
      result = 0;

    }
  }

  if (clickedItem == '0' || clickedItem == '1' ||
    clickedItem == '2' || clickedItem == '3' ||
    clickedItem == '4' || clickedItem == '5' ||
    clickedItem == '6' || clickedItem == '7' ||
    clickedItem == '8' || clickedItem == '9' ||
    clickedItem == '.') {

    if (nr1End == false) {
      nr1 += clickedItem;
    } else if (nr1End == true) {
      nr2 += clickedItem;
    }

  } else if (clickedItem === '/' || clickedItem === '-' ||
    clickedItem === '+' || clickedItem === 'X') {

    nr1End = true;
    mathOperation = clickedItem;

  } else if (clickedItem === 'C') {
    nr1End = false;
    nr1 = 0;
    nr2 = '';
    result = 0;
  } else if (clickedItem === '=' && nr2 === '') {
    nr1 = 0;
    nr2 = '';
    result = 0;
    displayText = '';
    displayPanel.textContent = displayText;
    return alert('invalid equation');
  } else if (clickedItem === '=' && nr2 !== '') {

    count(nr1, nr2, mathOperation)

  }

  console.log('nr1: ' + nr1, 'nr2: ' + nr2, 'result: ' + result);

}


document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', function () {

  //displaying equation on the screen
  if (this.textContent === '/' || this.textContent === '-' || this.textContent === '+') {
    displayText += ` ${this.textContent} `;
  } else if (this.textContent === 'X') {
    displayText += ` * `;
  } else if (this.textContent === 'C') {
    displayText = '';
  } else if (this.textContent === '=') {
    displayText += '';
  } else {
    displayText += this.textContent;
  }
  displayPanel.textContent = displayText;

  getNumbers(this.textContent);
}))