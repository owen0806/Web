var spinning = false, degSum = 0;
var num = 8, radius = 150;
var width = 0, deg = 360 / num, getItem = 0;
var wheeltext = '<div id="wheel-container">\
                    <div id="wheel">\
                    <div class="wheel-section" id="1">隨機遊戲</div>\
                    <div class="wheel-section" id="2">任意傳送</div>\
                    <div class="wheel-section" id="3">隨機遊戲</div>\
                    <div class="wheel-section" id="4">任意傳送</div>\
                    <div class="wheel-section" id="5">隨機遊戲</div>\
                    <div class="wheel-section" id="6">任意傳送</div>\
                    <div class="wheel-section" id="7">隨機遊戲</div>\
                    <div class="wheel-section" id="8">回到起點</div>\
                </div>\
                    <div class="pointer"></div>\
                    <div class="circle"></div>\
                    <div id="spin-button"></div>\
                </div>';

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

function startSpan() {
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
            document.getElementById('text').innerHTML = '';

            if (getItem == 1 || getItem == 5) {
                window.alert("踩地雷遊戲");
                show_minesweeper();
            } else if (getItem == 3 || getItem == 7) {
                window.alert("卡牌配對記憶遊戲");
                show_memoryGame();
            } else if (getItem == 2 || getItem == 4 || getItem == 6) {
                window.alert("任意傳送");
                goto_randomPos();
                mazeContainer.style.display = "block";
            } else if(getItem == 8) {
                window.alert("回到起點");
                goto_start();
                mazeContainer.style.display = "block";
            }

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
    game.innerHTML = '<div id="memory-game"></div>';
    game.style.display = 'block';
    start_memoryGame();
}

function show_minesweeper(){
    game.innerHTML = '<div id="board"></div>';
    game.style.display = 'block';
    start_minesweeper();
}

function goto_start() {
    var newRow = 0, newCol = 0;
    playerPosition.row = newRow;
    playerPosition.col = newCol;
    updatePlayerPosition();
}

function goto_randomPos() {
    var newRow, newCol;
    do{
      newRow = Math.floor(Math.random() * 15);
      newCol = Math.floor(Math.random() * 15);
    }while(mazeStructure[newRow][newCol] == 1);
    playerPosition.row = newRow;
    playerPosition.col = newCol;
    updatePlayerPosition();
}

function updatePlayerPosition() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.classList.remove("player"));

    const playerCellIndex = playerPosition.row * 15 + playerPosition.col;
    cells[playerCellIndex].classList.add("player");
}