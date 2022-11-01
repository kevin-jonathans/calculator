let currentNumber = "";
let previousNumber;
let activeOperator;
let result;

const calculate = {
    "+": (a,b) => Number(a) + Number(b),
    "-": (a,b) => Number(a) - Number(b),
    "*": (a,b) => Number(a) * Number(b),
    "/": (a,b) => Number(a) / Number(b),
    "^": (a,b) => Number(a) ** Number(b),
    "%": (a,b) => Number(a) % Number(b),
};

function updateMainScreen(mainText) {
    mainScreen.textContent = mainText;
}

function updateSecondaryScreen(secondaryText) {
    secondaryScreen.textContent = secondaryText;
}

const mainScreen = document.querySelector(".main-screen");
const secondaryScreen = document.querySelector(".secondary-screen");

const number = document.querySelectorAll(".btn.number");
for (const num of number) {
    num.addEventListener("click", writeNumber);
}

function writeNumber(event) {
    // console.log(event.target.value);
    currentNumber += event.target.value;
    updateMainScreen(currentNumber);
}

const operator = document.querySelectorAll(".btn.operator");
for (const op of operator) {
    op.addEventListener("click", writeOperator);
}

function writeOperator(event) {
    // console.log(event.target.value);
    if (currentNumber  === "") return;  
    if (previousNumber === undefined) {
        previousNumber = currentNumber;
    }
    activeOperator = event.target.value;
    currentNumber = "";
    updateSecondaryScreen(`${previousNumber} ${activeOperator}`);
    updateMainScreen("");
}

const equal = document.querySelector(".btn.result");
equal.addEventListener("click", calculateNumber);

function calculateNumber() {
    result = calculate[activeOperator](previousNumber, currentNumber);
    updateMainScreen(result);
    updateSecondaryScreen(`${previousNumber} ${activeOperator} ${currentNumber}`);
    previousNumber = result;
}

const clear = document.querySelector(".btn.clear");
clear.addEventListener("click", resetScreen);

function resetScreen() {
    currentNumber = "";
    previousNumber = undefined;
    activeOperator = undefined;
    result = undefined;
    updateSecondaryScreen();
    updateMainScreen();
}