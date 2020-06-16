const displayPanel = document.querySelector('.display');
const numBtns = document.querySelectorAll('.btn-num');
const operatorBtns = document.querySelectorAll('.btn-operator');
const clearBtn = document.querySelector('.btn-clear');
const decimalBtn = document.querySelector('.btn-decimal');
let displayValue = '0';
let pendingValue;
let equationArray = [];
let equationResult;

const updateDisplayValue = function () {

  //clear equationResult and use clicked number to next operation (instead of result)
  if (equationResult !== undefined) {
    // console.log('change equationResult to undefined');
    displayValue = '0';
    equationResult = undefined;
  }

  const btnText = this.textContent;
  if (displayValue === '0') displayValue = '';
  displayValue += btnText;
  displayPanel.textContent = displayValue;
  console.log(typeof displayValue);

}

const count = function () {
  let operator = this.textContent;
  switch (operator) {
    case '+':
      pendingValue = displayValue;
      displayValue = '0'
      displayPanel.textContent = displayValue;
      equationArray.push(pendingValue)
      equationArray.push(operator);
      break;
    case '-':
      pendingValue = displayValue;
      displayValue = '0'
      displayPanel.textContent = displayValue;
      equationArray.push(pendingValue)
      equationArray.push(operator)
      break;
    case 'X':
      pendingValue = displayValue;
      displayValue = '0'
      displayPanel.textContent = displayValue;
      equationArray.push(pendingValue)
      equationArray.push('*')
      break;
    case '/':
      pendingValue = displayValue;
      displayValue = '0'
      displayPanel.textContent = displayValue;
      equationArray.push(pendingValue)
      equationArray.push(operator)
      break;
    case '=':
      equationArray.push(displayValue);
      equationResult = eval(equationArray.join('')); //eval() function might be dangerous so it is better to change it

      //if result has residue with more than 2 decimal places, it rounds the result to 2 decimal places. X.XX
      if (equationResult % 1 < 1 && equationResult % 1 !== 0) {

        // console.log('result has residue');

        if (equationResult * 10 % 1 !== 0) {
          // console.log('2 decimal places');
          equationResult = equationResult.toFixed(2);
        } else {
          // console.log('one decimal place');
          equationResult = equationResult.toFixed(1);
        }
      }

      displayValue = equationResult;
      displayPanel.textContent = displayValue;
      equationArray = [];
      break;
  }
}

const clearAll = function () {
  displayValue = '0';
  pendingValue = undefined;
  equationResult = undefined;
  const equationArray = [];
  displayPanel.textContent = displayValue;
}

numBtns.forEach(btn => btn.addEventListener('click', updateDisplayValue));
operatorBtns.forEach(btn => btn.addEventListener('click', count));

clearBtn.addEventListener('click', clearAll);

decimalBtn.addEventListener('click', function () {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    displayPanel.textContent = displayValue;
  }
})