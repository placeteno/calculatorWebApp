'use strict';

const currentOperation = document.querySelector('.currentOperation');
const currentNumber = document.querySelector('.currentNumber');
const keyboard = document.querySelector('.numberKeyboard');
const appsList = document.querySelector('.appsList');

let prev = '';
let cur = '';
let operation;
let computation;

const clear = function () {
  prev = '';
  cur = '';
  operation = '';
  currentNumber.textContent = '';
  currentOperation.textContent = '';
};

const calculate = function () {
  if (operation === '+') {
    computation = Number(prev) + Number(cur);
    clear();
  } else if (operation === '-') {
    computation = Number(prev) - Number(cur);
    clear();
  } else if (operation === '*') {
    computation = Number(prev) * Number(cur);
    clear();
  } else if (operation === '/') {
    computation = Number(prev) / Number(cur);
    clear();
  }
  currentNumber.textContent = computation;
};

const convertToNeg = function () {
  if (cur === '' && currentNumber.textContent === '')
    currentNumber.textContent = '-';
  else if (currentNumber.textContent === '-') currentNumber.textContent = '';
  else {
    cur *= -1;
    currentNumber.textContent = cur;
  }
};

keyboard.addEventListener('click', e => {
  // gets input
  const key = e.target.closest('input');
  if (!key) return;

  // checks the type of key
  if (key.dataset.number) {
    if (key.value === '.' && cur.includes('.')) return; // check whether there's already a dot
    cur += key.value;
    currentNumber.textContent = cur;
    console.log(prev, cur, operation);
  } else if (key.dataset.operation) {
    if (key.value === '=') calculate();
    else if (key.value === 'AC') clear();
    else if (key.value === '-/+') convertToNeg();
    else {
      operation = key.value;
      prev = cur;
      currentOperation.textContent = String(cur) + ' ' + String(operation);
      cur = '';
    }
  }
});
