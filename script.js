const numberButton = document.querySelectorAll('.number');
const operationButton = document.querySelectorAll('.operation');
const resultButton = document.querySelector('#result');
const delButton = document.querySelector('#delete');
const acButton = document.querySelector('#all_clear');
const sqrtButton = document.querySelector('#sqrt');
const displayCurrentOperand = document.querySelector('#output_current_operand');
const displayPreviousOperand = document.querySelector('#output_previous_operand');

const calculator = {
    currentValue: '',
    previousValue: '',
    operation: null,
} 

const clearDisplay = () => {
    calculator.currentValue = '';
    calculator.previousValue = '';
    calculator.operation = null;
}

const deleteNumber = () => {
    calculator.currentValue = String(calculator.currentValue).slice(0, -1);
}

const addNumber = (number) => {
    if (number.value === '.' && String(calculator.currentValue).includes('.')) {
        return 
    }
    calculator.currentValue += number.value;
}

const chooseOperation = (op) => {
    if (calculator.currentValue === '') {
        return 
    }
    if (calculator.previousValue !== '') {
        calculate();
    }
    calculator.operation = op.value;
    calculator.previousValue = calculator.currentValue;
    calculator.currentValue = ''; 
}

const calculate = () => {
    let tempResult = null;
    let tempPreviousValue = parseFloat(calculator.previousValue);
    let tempCurrentValue = parseFloat(calculator.currentValue);
    if (isNaN(tempPreviousValue) || isNaN(tempCurrentValue)) {
        return
    }
    switch (calculator.operation) {
        case '+':
            tempResult = tempPreviousValue + tempCurrentValue;
            break;
        case '-':
            tempResult = tempPreviousValue - tempCurrentValue;
            break;
        case 'x':
            tempResult = tempPreviousValue * tempCurrentValue;
            break;
        case '/':
            tempResult = tempPreviousValue / tempCurrentValue;
            break;
        case '^':
            tempResult = Math.pow(tempPreviousValue, tempCurrentValue);
            break;
        default: 
            return
    }
    if (!isFinite(tempResult)) {
        return 
    }
    calculator.currentValue = tempResult;
    calculator.operation = null;
    calculator.previousValue = '';
}

const sqrtNumber = () => {
    let tempResult = '';
    let tempValue = parseFloat(calculator.currentValue);
    if (isNaN(tempValue) || Math.sign(tempValue) === -1) {
        return; 
    } else {
        tempResult = Math.sqrt(tempValue);
    }
    calculator.currentValue = tempResult;
}

const getDisplayNumber = (number) => {
    let strNumber = String(number);
    let intNumbers = parseFloat(strNumber.split('.')[0]);
    let pointNumbers = strNumber.split('.')[1];
    let intDisplay; 
    if (isNaN(intNumbers)) {
        intDisplay = ''
    } else {
        intDisplay = String(intNumbers);
    }
    if (pointNumbers != null) {
        return `${intDisplay}.${pointNumbers}`
    } else {
        return intDisplay
    }
}

const updateDisplay = () => {
    displayCurrentOperand.value = getDisplayNumber(calculator.currentValue);
    if (calculator.operation != null) {
        displayPreviousOperand.value = `${getDisplayNumber(calculator.previousValue)} ${calculator.operation}`;
    } else {
        displayPreviousOperand.value = ''
    }
}

numberButton.forEach(number => {
    number.addEventListener('click', () => {
        addNumber(number);
        updateDisplay();
    })
})

operationButton.forEach(op => {
    op.addEventListener('click', () => {
        chooseOperation(op);
        updateDisplay();
    })
})

resultButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
})

acButton.addEventListener('click', () => {
    clearDisplay();
    updateDisplay();
})

delButton.addEventListener('click', () => {
    deleteNumber();
    updateDisplay();
})

sqrtButton.addEventListener('click', () => {
    sqrtNumber();
    updateDisplay();
})
