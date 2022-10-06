'use strict';

class App {
  constructor(currentOperandTextEl, previousOperandTextEl) {
    this._currentOperandTextEl = currentOperandTextEl;
    this._previousOperandTextEl = previousOperandTextEl;
    this.clearData();
  }

  clearData() {
    this.prev = '';
    this.cur = '';
    this.operation = '';
    this._currentOperandTextEl.textContent = '';
    this._previousOperandTextEl.textContent = '';
  }

  getNumber(number) {
    if (number === '.' && this.cur.includes('.')) return;
    if (this.cur.length === 8) return;
    this.cur = this.cur.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.cur === '') return;
    if (this.prev !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.prev = this.cur;
    this.cur = '';
  }

  updateDisplay() {
    if (this.cur || this.prev) {
      this._currentOperandTextEl.textContent = this.formatNumber(this.cur);
      this._previousOperandTextEl.textContent =
        this.prev + ' ' + this.operation.toString();
    }
  }

  convertToNeg() {
    if (this.cur === '' && this._currentOperandTextEl.textContent === '')
      this._currentOperandTextEl.textContent = '-';
    else if (this._currentOperandTextEl.textContent === '-')
      this._currentOperandTextEl.textContent = '';
    else {
      this.cur *= -1;
      this._currentOperandTextEl.textContent = this.formatNumber(this.cur);
    }
  }

  formatNumber(number) {
    this.number = number;
    return String(Number(this.number).toLocaleString());
  }

  calculate() {
    let computation;
    const previous = parseFloat(this.prev);
    const current = parseFloat(this.cur);
    if (isNaN(previous) || isNaN(current)) return;
    if (this.operation === '+') {
      computation = previous + current;
      this.clearData();
    } else if (this.operation === '-') {
      computation = previous - current;
      this.clearData();
    } else if (this.operation === '*') {
      computation = previous * current;
      this.clearData();
    } else if (this.operation === '/') {
      computation = previous / current;
      this.clearData();
    }
    this.cur = computation;
    // this.operation = undefined;
    this.prev = '';
    this._previousOperandTextEl.textContent = computation;
  }
}

const previousOperand = document.querySelector('.currentOperation');
const currentOperand = document.querySelector('.currentNumber');
const keyboard = document.querySelector('.numberKeyboard');
const appsList = document.querySelector('.appsList');

const calculator = new App(currentOperand, previousOperand);

keyboard.addEventListener('click', e => {
  const key = e.target.closest('input');
  if (!key) return;
  if (key.dataset.number) {
    calculator.getNumber(key.value);
    calculator.updateDisplay();
  } else if (key.dataset.operation) {
    if (key.value === '=') {
      calculator.calculate();
    } else if (key.value === 'AC') calculator.clearData();
    else if (key.value === '-/+') calculator.convertToNeg();
    else {
      calculator.chooseOperation(key.value);
      calculator.updateDisplay();
    }
  }
});
