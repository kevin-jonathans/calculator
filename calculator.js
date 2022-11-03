let previousNumber;
let activeOperator;
let result;

const calculate = {
    "+": (a,b) => Number(a) + Number(b),  // add
    "-": (a,b) => Number(a) - Number(b),  // subtract
    "*": (a,b) => Number(a) * Number(b),  // multiply
    "/": (a,b) => Number(a) / Number(b),  // divide
    "^": (a,b) => Number(a) ** Number(b),  // power/exponent
    "%": (a,b) => Number(a) % Number(b),  // modulo
};

function updateMainScreen(text) {
    mainScreen.textContent = text;
}

function updateSecondaryScreen(text) {
    secondaryScreen.textContent = text;
}

const mainScreen = document.querySelector(".main-screen");
const secondaryScreen = document.querySelector(".secondary-screen");

const number = document.querySelectorAll(".btn.number");
for (const num of number) {
    num.addEventListener("click", (event) => writeNumber(event.target.value));
}

function writeNumber(value) {
    // console.log(event.target.value);
    updateMainScreen(mainScreen.textContent + value);
}

const operator = document.querySelectorAll(".btn.operator");
for (const op of operator) {
    op.addEventListener("click", (event) => writeOperator(event.target.value));
}

function writeOperator(value) {
    // console.log(event.target.value);
    if (!(mainScreen.textContent === "") && previousNumber && activeOperator) {
        calculateNumber();
    }

    if (mainScreen.textContent === "") {
        activeOperator = value;  // For change operator only
        updateSecondaryScreen(`${previousNumber} ${activeOperator}`);
        return;
    }
    previousNumber = mainScreen.textContent;
    activeOperator = value;
    updateSecondaryScreen(`${previousNumber} ${activeOperator}`);
    updateMainScreen("");  // reset mainScreen
}

const equal = document.querySelector(".btn.result");
equal.addEventListener("click", calculateNumber);

function calculateNumber() {
    if (!secondaryScreen.textContent || !mainScreen.textContent) {
        updateMainScreen("ERROR");
        setTimeout(resetScreen, 1000);
        return;
    }
    result = calculate[activeOperator](previousNumber, mainScreen.textContent);
    result = (Math.round((result + Number.EPSILON) * 100000000) / 100000000).toString();  //round 8 digit and change type into string
    updateSecondaryScreen(`${previousNumber} ${activeOperator} ${mainScreen.textContent}`);
    updateMainScreen(result);
    previousNumber = undefined;
    activeOperator = undefined;
}

const clear = document.querySelector(".btn.clear");
clear.addEventListener("click", resetScreen);

function resetScreen() {
    previousNumber = undefined;
    activeOperator = undefined;
    result = undefined;
    updateSecondaryScreen();
    updateMainScreen();
}

const backspace = document.querySelector(".btn.erase");
backspace.addEventListener("click", erase);

function erase() {
    // Delete last char in string
    updateMainScreen(mainScreen.textContent.slice(0, (mainScreen.textContent.length - 1)));
}

const dot = document.querySelector(".btn.dot");
dot.addEventListener("click", writePoint);

function writePoint() {
    // Check if textContent contain "." with Regex
    // return true or false
    if (/[.]/.test(mainScreen.textContent)) return;
    updateMainScreen(mainScreen.textContent + ".");
}

const positiveNegative = document.querySelector(".btn.positive-negative");
positiveNegative.addEventListener("click", writePositiveNegative);

function writePositiveNegative() {
    // Check if textContent contain "-" with Regex
    // return true or false
    if (/[-]/.test(mainScreen.textContent)) {
        updateMainScreen(mainScreen.textContent.replace("-", ""));
    } else {
        updateMainScreen("-" + mainScreen.textContent);
    }
}
