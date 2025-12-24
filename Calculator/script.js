
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;
let historyLog = JSON.parse(localStorage.getItem('calcHistory')) || [];

const mainDisplay = document.getElementById('main-display');
const historyDisplay = document.getElementById('history-display');
const historyList = document.getElementById('history-list');
const historyPanel = document.getElementById('history-panel');

// Theme Logic
function changeTheme(color) {
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('preferredTheme', color);
}

// Load saved theme on startup
const savedTheme = localStorage.getItem('preferredTheme');
if (savedTheme) changeTheme(savedTheme);

function toggleHistory() {
    historyPanel.classList.toggle('open');
    updateHistoryUI();
}

function updateHistoryUI() {
    if (historyLog.length === 0) {
        historyList.innerHTML = `<p class="text-gray-500 text-center mt-10 italic">No history yet</p>`;
        return;
    }
    historyList.innerHTML = historyLog.map(item => `
                <div class="pb-3 border-b border-white/5 mb-3">
                    <div class="text-xs accent-text opacity-60">${item.equation}</div>
                    <div class="text-lg font-semibold text-white">${item.result}</div>
                </div>
            `).join('');
}

function appendNumber(num) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function setOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operation === null || shouldResetScreen) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current === 0 ? 'Error' : prev / current; break;
        case '%': result = prev % current; break;
    }

    const equationString = `${prev} ${getSymbol(operation)} ${current} =`;

    if (result !== 'Error') {
        historyLog.unshift({ equation: equationString, result: result });
        if (historyLog.length > 20) historyLog.pop();
        localStorage.setItem('calcHistory', JSON.stringify(historyLog));
    }

    historyDisplay.textContent = equationString;
    currentInput = result.toString();
    operation = null;
    shouldResetScreen = true;
    updateDisplay();
}

function getSymbol(op) {
    return { '/': '÷', '*': '×', '+': '+', '-': '-', '%': '%' }[op];
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    historyDisplay.textContent = '';
    updateDisplay();
}

function deleteLast() {
    if (shouldResetScreen) return;
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function clearHistory() {
    historyLog = [];
    localStorage.removeItem('calcHistory');
    updateHistoryUI();
}

function updateDisplay() {
    mainDisplay.textContent = currentInput;
    if (operation && !shouldResetScreen) {
        historyDisplay.textContent = `${previousInput} ${getSymbol(operation)}`;
    }
    // Auto Font Scaling
    if (currentInput.length > 8) {
        mainDisplay.classList.replace('text-5xl', 'text-3xl');
    } else {
        mainDisplay.classList.replace('text-3xl', 'text-5xl');
    }
}
