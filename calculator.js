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
    num.addEventListener("click", writeNumber);
}

function writeNumber(event) {
    // console.log(event.target.value);
    const temp = mainScreen.textContent + event.target.value;
    updateMainScreen(temp);
}

const operator = document.querySelectorAll(".btn.operator");
for (const op of operator) {
    op.addEventListener("click", writeOperator);
}

function writeOperator(event) {
    // console.log(event.target.value);
    if (!(mainScreen.textContent === "") && previousNumber && activeOperator) {
        calculateNumber();
    }

    if (mainScreen.textContent === "") {
        activeOperator = event.target.value;
        updateSecondaryScreen(`${previousNumber} ${activeOperator}`);
        return;
    }
    previousNumber = mainScreen.textContent;
    activeOperator = event.target.value;
    updateSecondaryScreen(`${previousNumber} ${activeOperator}`);
    updateMainScreen("");
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
    result = (Math.round((result + Number.EPSILON) * 100000000) / 100000000).toString();
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
    updateMainScreen(mainScreen.textContent.slice(0, (mainScreen.textContent.length - 1)));
}

const dot = document.querySelector(".btn.dot");
dot.addEventListener("click", writePoint);

function writePoint() {
    if (/[.]/.test(mainScreen.textContent)) return;
    updateMainScreen(mainScreen.textContent + ".");
}

const positiveNegative = document.querySelector(".btn.positive-negative");
positiveNegative.addEventListener("click", writePositiveNegative);

function writePositiveNegative() {
    if (/[-]/.test(mainScreen.textContent)) {
        updateMainScreen(mainScreen.textContent.replace("-", ""));
    } else {
        updateMainScreen("-" + mainScreen.textContent);
    }
}
