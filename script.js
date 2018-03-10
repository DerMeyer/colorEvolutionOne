// event handlers

var cycle = 1500;
var timeoutID;

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
var btn5 = document.getElementById('btn5');
var btn6 = document.getElementById('btn6');

btn1.addEventListener('click', function(e) {
    if (btn1.classList.contains('active')) {
        return;
    }
    btn1.classList.add('active');
    if (btn2.classList.contains('active')) {
        btn2.classList.remove('active');
    } else {
        btn3.classList.remove('active');
    }
    grid.innerHTML = '';
    clearTimeout(timeoutID);
    buildEvolution(5);
});

btn2.addEventListener('click', function() {
    if (btn2.classList.contains('active')) {
        return;
    }
    btn2.classList.add('active');
    if (btn1.classList.contains('active')) {
        btn1.classList.remove('active');
    } else {
        btn3.classList.remove('active');
    }
    grid.innerHTML = '';
    clearTimeout(timeoutID);
    buildEvolution(10);
});

btn3.addEventListener('click', function() {
    if (btn3.classList.contains('active')) {
        return;
    }
    btn3.classList.add('active');
    if (btn2.classList.contains('active')) {
        btn2.classList.remove('active');
    } else {
        btn1.classList.remove('active');
    }
    grid.innerHTML = '';
    clearTimeout(timeoutID);
    buildEvolution(42);
});

btn4.addEventListener('click', function(e) {
    if (btn4.classList.contains('active')) {
        return;
    }
    btn4.classList.add('active');
    if (btn5.classList.contains('active')) {
        btn5.classList.remove('active');
    } else {
        btn6.classList.remove('active');
    }
    cycle = 1500;
});

btn5.addEventListener('click', function(e) {
    if (btn5.classList.contains('active')) {
        return;
    }
    btn5.classList.add('active');
    if (btn6.classList.contains('active')) {
        btn6.classList.remove('active');
    } else {
        btn4.classList.remove('active');
    }
    cycle = 300;
});

btn6.addEventListener('click', function(e) {
    if (btn6.classList.contains('active')) {
        return;
    }
    btn6.classList.add('active');
    if (btn5.classList.contains('active')) {
        btn5.classList.remove('active');
    } else {
        btn4.classList.remove('active');
    }
    cycle = 1;
});

function buildEvolution(rows) {

    var areas = rows * rows;
    var grid = document.getElementById('grid');
    grid.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${rows}, 1fr)`;
    var sqrs = document.getElementsByClassName('sqr');
    var field;
    for (var a = 0; a < areas; a++) {
        field = document.createElement('div');
        field.classList.add('sqr');
        field.setAttribute('id', + a);
        grid.appendChild(field);
    }

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

    function indexPredator() {
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

    function attack() {
        var predator = document.getElementById(indexPredator());
        var prey = document.getElementById(indexPrey(predator.id));

        if (rows > 10) {
            predator.style.boxSizing = 'border-box';
            prey.style.boxSizing = 'border-box';
        }

        if (cycle > 200) {
            predator.style.border = Math.max(7 / rows, .7) + 'vh solid red';
            prey.style.border = Math.max(7 / rows, .7) + 'vh solid blue';

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
        } else {
            prey.style.backgroundColor = predator.style.backgroundColor;
        }

        timeoutID = setTimeout(function() {
            attack();
        }, cycle);
    }

    setTimeout(function() {
        attack();
    }, 500);

    function stop() {
        clearTimeout(timeoutID);
    }
}

buildEvolution(5);
