var spinning = false, degSum = 0;
var num = 8, radius = 150;
var width = 0, deg = 360 / num, getItem = 0;
var wheeltext = '<div id="wheel-container">\
                    <div id="wheel">\
                    <div class="wheel-section" id="1">隨機遊戲</div>\
                    <div class="wheel-section" id="2">暫停5秒</div>\
                    <div class="wheel-section" id="3">隨機遊戲</div>\
                    <div class="wheel-section" id="4">時間歸零</div>\
                    <div class="wheel-section" id="5">隨機遊戲</div>\
                    <div class="wheel-section" id="6">返回起點</div>\
                    <div class="wheel-section" id="7">隨機遊戲</div>\
                    <div class="wheel-section" id="8">暫停3秒</div>\
                </div>\
                    <div class="pointer"></div>\
                    <div class="circle"></div>\
                    <div id="spin-button"></div>\
                </div>';

function start(){
    const showbtn = document.getElementById('showbtn');
    showbtn.addEventListener('click', show_wheel, false);
}

function show_wheel(){
    document.getElementById('text').innerHTML = wheeltext;
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    compute_width();
    spinButton.addEventListener('click', startSpan, false);
}

function compute_width(){
    const section = document.querySelectorAll('.wheel-section');

    width = radius * 2 * Math.tan((deg / 2) * Math.PI / 180);
    section.forEach(item => {
        item.style.width = width + 'px';
    });
}

function startSpan(){
    if (!spinning) {
        const turns = 5;
        degSum += Math.floor(Math.random() * 360) + 360 * turns;
        spinning = true;

        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `rotate(${degSum}deg)`;

        setTimeout(() => {
            wheel.style.transition = 'none';
            spinning = false;
            getItem = check();
            window.alert('You are drawn ' + getItem);
            document.getElementById('text').innerHTML = '';
            if(getItem == 1 || getItem == 5) show_minesweeper();
            else if(getItem == 3 || getItem == 7) show_memoryGame();
        }, 3000);
    }
}

function check(){
    const remainDeg = degSum % 360;
    if(remainDeg <= 22.5) return 8;
    else if(remainDeg < 67.5) return 7;
    else if(remainDeg < 112.5) return 6;
    else if(remainDeg < 157.5) return 5;
    else if(remainDeg < 202.5) return 4;
    else if(remainDeg < 247.5) return 3;
    else if(remainDeg < 292.5) return 2;
    else if(remainDeg < 337.5) return 1;
    else return 8;
}

function show_memoryGame(){
    document.getElementById('game').innerHTML = '<div id="memory-game"></div>';
    start_memoryGame();
}

function show_minesweeper(){
    document.getElementById('game').innerHTML = '<div id="board"></div>';
    start_minesweeper();
}

window.addEventListener('load', start, false);