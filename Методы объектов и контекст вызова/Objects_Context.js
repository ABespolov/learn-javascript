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
    }
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
    }
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
    };
    this.addMethod = function (operation, func) {
        this.functions[operation] = func;
    }
};

// ..-> Дескрипторы, геттеры и сеттеры свойств
const User = function (fullName) {
    this.fullName = fullName;
    Object.defineProperties(this, {
        firstName: {
            get: function () {
                console.log(fullName);
                return fullName.split(' ')[0];
            },
            set: function (name) {
                this.fullName = name + ' ' + this.fullName.split(' ')[1];
            }
        },
        lastName: {
            get: function () {
                return this.fullName.split(' ')[1];
            },
            set: function (name) {
                this.fullName = this.fullName.split(' ')[0] + ' ' + name;
            }

        }
    });
};

// ..-> Статические и фабричные методы
const Article = function () {
    Article.created = new Date();
    Article.count = ++Article.count || 1;
    Article.showStats = function () {
        alert(`Всего: ${Article.count}, Последняя: ${Article.created}`);
    }
};

// ..-> Явное указание this: "call", "apply"
const sumArgs = function () {
    return [].reduce.call(arguments, (a, b) => a + b);
};

// ..-> Привязка контекста и карринг: "bind"
const myBind = function (f, context) {
    return function (...arg) {
        f.apply(context, arg);
    }
};

const ask = function (question, answer, ok, fail) {
    let result = prompt(question, '');
    if (result.toLowerCase() == answer.toLowerCase()) ok();
    else fail();
};

const askUser = {
    login: 'Василий',
    password: '12345',

    loginOk: function () {
        alert(this.login + ' вошёл на сайт');
    },

    loginFail: function () {
        alert(this.login + ': ошибка входа');
    },

    checkPassword: function () {
        ask("Ваш пароль?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));
    }
};

// ..-> Функции-обёртки, декораторы
let work = function (a, b) {
    alert(a + b);
};

let log = [];
const makeLogging = function (f, log) {
    return function (...args) {
        log.push(args);
        f.apply(this, args);
    };
};

function f(x) {
    return Math.random() * x;
}

function makeCaching(f) {
    const cache = {};
    return function (number) {
        if (cache[number] === undefined) cache[number] = f.call(this, number);
        return cache[number];
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
        const powerCalc = new PowerCalculator;
        powerCalc.addMethod("*", function (a, b) {
            return a * b;
        });
        powerCalc.addMethod("/", function (a, b) {
            return a / b;
        });
        powerCalc.addMethod("**", function (a, b) {
            return Math.pow(a, b);
        });
        const result = powerCalc.calculate("2 ** 3");
        alert(result);
    },
    user: function () {
        const vasya = new User("Василий Попкин");
        alert(vasya.firstName);
        alert(vasya.lastName);
        vasya.lastName = 'Сидоров';
        alert(vasya.fullName);
    },
    article: function () {
        new Article();
        new Article();
        Article.showStats();
        new Article();
        Article.showStats();
    },
    sumArgs: function () {
        alert(sumArgs(1, 2, 3));
    },
    myBind: function () {
        function say(a, b, c) {
            alert(a + b + c + this);
        }

        const func = myBind(say, '!!!!');
        func(1, 2, 3);
    },
    askUser: function () {
        askUser.checkPassword();
    },
    makeLogging: function () {
        work = makeLogging(work, log);
        work(1, 2);
        work(4, 5);
        for (var i = 0; i < log.length; i++) {
            var args = log[i];
            alert('Лог:' + args.join());
        }
    },
    makeCaching: function () {
        f = makeCaching(f);
        var a, b;
        a = f(1);
        b = f(1);
        alert(a == b);
        b = f(2);
        alert(a == b);
    }
};

// Try one :)
// test.calculator();
// test.ladder();
// test.sum();
// test.accumulator();
// test.powerCalculator();
// test.user();
// test.article();
// test.sumArgs();
// test.askUser();
// test.makeLogging();
// test.makeCaching();
