'use strict';

const currentOperation = document.querySelector('.currentOperation');
const currentNumber = document.querySelector('.currentNumber');
const keyboard = document.querySelector('.numberKeyboard');
const appsList = document.querySelector('.appsList');

let prev = '';
let cur = '';
let operation;
let computation;

const clearData = function () {
  prev = '';
  cur = '';
  operation = '';
  currentNumber.textContent = '';
  currentOperation.textContent = '';
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

const formatNumber = function (num) {
  return String(Number(num).toLocaleString());
};

const calculate = function () {
  if (operation === '+') {
    computation = Number(prev) + Number(cur);
    clearData();
  } else if (operation === '-') {
    computation = Number(prev) - Number(cur);
    clearData();
  } else if (operation === '*') {
    computation = Number(prev) * Number(cur);
    clearData();
  } else if (operation === '/') {
    computation = Number(prev) / Number(cur);
    clearData();
  }
  currentOperation.textContent = formatNumber(computation);
};

keyboard.addEventListener('click', e => {
  // gets input
  const key = e.target.closest('input');
  if (!key) return;

  // checks the type of key
  if (key.dataset.number) {
    if (key.value === '.' && cur.includes('.')) return; // check whether there's already a dot
    if (cur.length === 8) return;
    cur += key.value;
    let formated = formatNumber(cur);
    currentNumber.textContent = formated;
    console.log(prev, cur, operation);
  } else if (key.dataset.operation) {
    if (key.value === '=') calculate();
    else if (key.value === 'AC') clearData();
    else if (key.value === '-/+') convertToNeg();
    else {
      operation = key.value;
      prev = cur;
      currentOperation.textContent =
        formatNumber(cur) + ' ' + String(operation);
      cur = '';
    }
  }
});
