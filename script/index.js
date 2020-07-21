const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousOutput = document.querySelector("[data-previous-operand]");
const currentOutput = document.querySelector("[data-current-operand]");

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.innerHTML === "." && currentOutput.innerHTML.includes(".")) {
            return;
        } else {
            currentOutput.innerHTML += button.innerHTML
        }
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOutput.innerHTML === "" || currentOutput.innerHTML === ".") {
            return;
        };
        if (previousOutput.innerHTML !== "") {
            compute();
        };

        currentOutput.innerHTML += button.innerHTML;
        previousOutput.innerHTML = currentOutput.innerHTML;
        currentOutput.innerHTML = "";
    });
});

equalButton.addEventListener("click", compute);


clearButton.addEventListener("click", () => {
    previousOutput.innerHTML = null;
    currentOutput.innerHTML = null;
});

deleteButton.addEventListener("click", () => {
    currentOutput.innerHTML = currentOutput.innerHTML.slice(0, -1);
});

function compute() {
    let computation = null;
    let prev = parseFloat(previousOutput.innerHTML);
    let current = parseFloat(currentOutput.innerHTML);
    let operation = previousOutput.innerHTML.slice(previousOutput.innerHTML.length - 1);

    if (isNaN(prev) || isNaN(current)) {
        return;
    };

    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "/":
            computation = prev / current;
            break;
        default:
            break;
    };

    if (isFinite(computation)) {
        currentOutput.innerHTML = computation;
        operation = null;
        previousOutput.innerHTML = null;
    } else {
        previousOutput.innerHTML = "Divide by zero error";
        currentOutput.innerHTML = null;
        operation = null;
    };
};