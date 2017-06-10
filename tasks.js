// Tasks from https://learn.javascript.ru

// Методы объектов и контекст вызова
// ..-> Методы объектов, this
const calculator = {
    read() {
        this.firstNumber = +prompt('Enter first number', 0);
        this.secondNumber = +prompt('Enter second number', 0);
    },
    sum() {
        const sum = this.firstNumber + this.secondNumber || 'You may enter numbers only';
        alert(sum);
    },
    mul() {
        const mul = this.firstNumber * this.secondNumber || 'You may enter numbers only';
        alert(mul);
    },
};

const ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        alert(this.step);
    },
};

// ..-> Преобразование объектов: toString и valueOf
const sum = function () {
    let wholeSum = 0;

    function calculate(number) {
        wholeSum += number;
        return calculate;
    }

    calculate.toString = function () {
        return wholeSum;
    };
    return calculate;
};

// ..-> Создание объектов через "new"
const Accumulator = function (value) {
    this.value = value;
    this.read = function () {
        this.value += +prompt('Enter number', 0);
    };
};

const PowerCalculator = function () {
    this.functions = {'+': (a, b) => a + b, '-': (a, b) => a - b};
    this.calculate = function (str) {
        str = str.split(' ');
        let a = str[0], b = str[2], operation = str[1];
        return this.functions[operation](a, b);
    }
    this.addMethod = function (operation, func) {
        this.functions[operation] = func;
    }
}


// Tests for all tasks
const test = {
    calculator: function () {
        calculator.read();
        calculator.sum();
        calculator.mul();
    },
    ladder: function () {
        ladder.up().up().down().up().down().showStep();
    },
    sum: function () {
        alert(sum(0)(1)(2)(3)(4)(5));
    },
    accumulator: function () {
        const accumulator = new Accumulator(1);
        accumulator.read();
        accumulator.read();
        alert(accumulator.value);
    },
    powerCalculator: function () {
        var powerCalc = new PowerCalculator;
        powerCalc.addMethod("*", function (a, b) {
            return a * b;
        });
        powerCalc.addMethod("/", function (a, b) {
            return a / b;
        });
        powerCalc.addMethod("**", function (a, b) {
            return Math.pow(a, b);
        });
        let result = powerCalc.calculate("2 ** 3");
        alert(result);
    }
};

// Try one :)
// test.calculator();
// test.ladder();
// test.sum();
// test.accumulator();
// test.powerCalculator();
