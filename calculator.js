const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const functionButtons = document.querySelectorAll('.function');
const advancedButtons = document.querySelectorAll('.advanced');

let currentInput = '';
let operator = '';
let previousInput = '';

// Handle number input
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.num === '.' && currentInput.includes('.')) return;
        currentInput += btn.dataset.num;
        updateDisplay();
    });
});

// Handle operators
operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.op === '=') {
            calculate();
        } else {
            if (currentInput === '' && previousInput !== '') operator = btn.dataset.op;
            else if (currentInput !== '') {
                if (previousInput !== '') calculate();
                else previousInput = currentInput;
                operator = btn.dataset.op;
                currentInput = '';
            }
        }
    });
});

// Handle functions
functionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switch(btn.dataset.fn) {
            case 'C':
                currentInput = '';
                previousInput = '';
                operator = '';
                break;
            case '←':
                currentInput = currentInput.slice(0, -1);
                break;
            case '+/-':
                if (currentInput) currentInput = (parseFloat(currentInput) * -1).toString();
                break;
            case '%':
                if (currentInput) currentInput = (parseFloat(currentInput)/100).toString();
                break;
        }
        updateDisplay();
    });
});

// Handle advanced functions
advancedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!currentInput) return;
        let x = parseFloat(currentInput);
        switch(btn.dataset.fn) {
            case '√': currentInput = Math.sqrt(x); break;
            case 'x²': currentInput = x*x; break;
            case '1/x': currentInput = 1/x; break;
            case 'sin': currentInput = Math.sin(x * Math.PI/180); break;
            case 'cos': currentInput = Math.cos(x * Math.PI/180); break;
            case 'tan': currentInput = Math.tan(x * Math.PI/180); break;
            case 'ln': currentInput = Math.log(x); break;
            case 'log': currentInput = Math.log10(x); break;
            case 'e^x': currentInput = Math.exp(x); break;
        }
        currentInput = currentInput.toString();
        updateDisplay();
    });
});

function calculate() {
    if (!previousInput || !operator || !currentInput) return;
    let a = parseFloat(previousInput);
    let b = parseFloat(currentInput);
    switch(operator) {
        case '+': currentInput = (a+b).toString(); break;
        case '-': currentInput = (a-b).toString(); break;
        case '*': currentInput = (a*b).toString(); break;
        case '/': currentInput = b!==0 ? (a/b).toString() : 'Error'; break;
    }
    previousInput = '';
    operator = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

updateDisplay();

