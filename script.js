// construction

var rows = 5;
var areas = rows * rows;

var grid = document.getElementById('grid');
grid.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${rows}, 1fr)`;

var field;

for (var a = 0; a < areas; a++) {
    field = document.createElement('div');
    field.classList.add('sqr');
    field.setAttribute('id', + a); // adding indexes
    grid.appendChild(field);
}

var sqrs = document.getElementsByClassName('sqr');

function randomRGB() {
    var a = [];
    for (var i = 0; i < 3; i++) {
        a.push(Math.floor(Math.random() * 256));
    }
    return `rgb(${a[0]}, ${a[1]}, ${a[2]})`;
}

for (var i = 0; i < sqrs.length; i++) {

    sqrs[i].style.height = 75 / rows + 'vh';
    sqrs[i].style.width = 75 / rows + 'vh';
    sqrs[i].style.backgroundColor = randomRGB();
    sqrs[i].style.boxShadow = 4 / rows + 'vh ' + 4 / rows + 'vh ' + 4 / rows + 'vh ' + 'gray';
}

// action

function index() {
    return + Math.floor(Math.random() * areas);
}

function indexPrey(n) {
    var v = Number(n);
    var arr = [v-rows-1, v-rows, v-rows+1, v-1, v+1, v+rows-1, v+rows, v+rows+1];
    var random = fn();
    function fn() {
        r = Math.floor(Math.random() * 8);
        if (arr[r] < 0 || areas - 1 < arr[r]) {
            fn();
        } else if (v % rows === 0 && arr[r] % rows === rows - 1) {
            fn();
        } else if (v % rows === rows - 1 && arr[r] % rows === 0) {
            fn();
        }
        return r;
    }
    return + arr[random];
}

var cycle = 1000;
var timeoutID;

function attack() {
    var predator = document.getElementById(index());
    var prey = document.getElementById(indexPrey(predator.id));

    predator.style.border = '6px solid red';
    prey.style.border = '6px solid blue';

    predator.style.zIndex = '100';

    setTimeout(function() {
        if (Number(predator.id) - Number(prey.id) === rows + 1) {
            predator.style.transform = 'translate(-50%, -50%)'
        } else if (Number(predator.id) - Number(prey.id) === rows) {
            predator.style.transform = 'translate(0, -50%)'
        } else if (Number(predator.id) - Number(prey.id) === rows - 1) {
            predator.style.transform = 'translate(50%, -50%)'
        } else if (Number(predator.id) - Number(prey.id) === 1) {
            predator.style.transform = 'translate(-50%, 0)'
        } else if (Number(predator.id) - Number(prey.id) === - 1) {
            predator.style.transform = 'translate(50%, 0)'
        } else if (Number(predator.id) - Number(prey.id) === - rows + 1) {
            predator.style.transform = 'translate(-50%, 50%)'
        } else if (Number(predator.id) - Number(prey.id) === - rows) {
            predator.style.transform = 'translate(0, 50%)'
        } else {
            predator.style.transform = 'translate(50%, 50%)'
        }
        prey.style.backgroundColor = predator.style.backgroundColor;
    }, cycle / 2);

    setTimeout(function() {
        predator.style.border = 0;
        prey.style.border = 0;
        predator.style.zIndex = '0';
        predator.style.transform = 'translate(0)'
    }, cycle);

    timeoutID = setTimeout(function() {
        attack();
    }, cycle);
}

function stop() {
    clearTimeout(timeoutID);
}

setTimeout(function() {
    attack();
}, cycle);
