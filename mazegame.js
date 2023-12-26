let playerPosition = { row: 0, col: 0 };
const startPosition = { row: 0, col: 0 };
const endPosition = { row: 14, col: 14 };

const mazeStructure = Array.from({ length: 15 }, () => Array(15).fill(0));

      mazeStructure[1][2] = 1;
      mazeStructure[1][3] = 1;
      mazeStructure[1][4] = 1;
      mazeStructure[1][5] = 1;
      mazeStructure[1][6] = 1;
      mazeStructure[0][8] = 1;
      mazeStructure[1][8] = 1;
      mazeStructure[2][8] = 1;
      mazeStructure[3][8] = 1;
      mazeStructure[2][6] = 1;
      mazeStructure[3][6] = 1;
      mazeStructure[4][6] = 1;
      mazeStructure[5][6] = 1;
      mazeStructure[5][8] = 1;
      mazeStructure[5][9] = 1;
      mazeStructure[1][10] = 1;
      mazeStructure[2][10] = 1;
      mazeStructure[3][10] = 1;
      mazeStructure[4][10] = 1;
      mazeStructure[5][10] = 1;
      mazeStructure[0][12] = 1;
    //   mazeStructure[0][13] = 1;
      mazeStructure[0][14] = 1;
      mazeStructure[2][12] = 1;
      mazeStructure[3][12] = 1;
      mazeStructure[4][12] = 1;
      mazeStructure[5][12] = 1;
      mazeStructure[6][12] = 1;
      mazeStructure[7][12] = 1;
      mazeStructure[7][11] = 1;
      mazeStructure[7][10] = 1;
      mazeStructure[7][10] = 1;
      mazeStructure[8][10] = 1;
      mazeStructure[9][10] = 1;
      mazeStructure[7][8] = 1;                                        
      mazeStructure[9][8] = 1;
      mazeStructure[10][10] = 1;
      mazeStructure[10][9] = 1;
      mazeStructure[10][8] = 1;
    //   mazeStructure[1][14] = 1;
      mazeStructure[2][14] = 1;
    //   mazeStructure[3][14] = 1;
      mazeStructure[4][14] = 1;
    //   mazeStructure[5][14] = 1;
      mazeStructure[6][14] = 1;
    //   mazeStructure[7][14] = 1;
      mazeStructure[8][14] = 1;
      mazeStructure[9][14] = 1;
    //   mazeStructure[10][14] = 1;
    //   mazeStructure[11][14] = 1;
      mazeStructure[12][14] = 1;
      mazeStructure[9][12] = 1;
      mazeStructure[10][12] = 1;
      mazeStructure[11][12] = 1;
      mazeStructure[12][12] = 1;
      mazeStructure[12][11] = 1;
      mazeStructure[12][10] = 1;
      mazeStructure[12][9] = 1;
      mazeStructure[12][8] = 1;
      mazeStructure[12][7] = 1;
      mazeStructure[2][0] = 1;
      mazeStructure[3][0] = 1;
    //   mazeStructure[4][0] = 1;
    //   mazeStructure[5][0] = 1;
      mazeStructure[6][0] = 1;
      mazeStructure[7][0] = 1;
      mazeStructure[7][1] = 1;
      mazeStructure[7][3] = 1;
      mazeStructure[7][4] = 1;
      mazeStructure[2][2] = 1;
      mazeStructure[3][2] = 1;
      mazeStructure[3][2] = 1;
      mazeStructure[9][2] = 1;
      mazeStructure[2][4] = 1;
      mazeStructure[3][4] = 1;
      mazeStructure[5][2] = 1;
      mazeStructure[5][3] = 1;
      mazeStructure[5][4] = 1;
      mazeStructure[5][5] = 1;
      mazeStructure[6][5] = 1;
      mazeStructure[7][5] = 1;
      mazeStructure[7][6] = 1;
      mazeStructure[7][7] = 1;
      mazeStructure[9][3] = 1;
      mazeStructure[9][4] = 1;
      mazeStructure[9][5] = 1;
      mazeStructure[9][6] = 1;
      mazeStructure[10][6] = 1;
      mazeStructure[10][7] = 1;
      mazeStructure[9][1] = 1;
      mazeStructure[10][1] = 1;
      mazeStructure[11][1] = 1;
    //   mazeStructure[13][1] = 1;
      mazeStructure[13][0] = 1;
      mazeStructure[11][3] = 1;
      mazeStructure[11][4] = 1;
      mazeStructure[12][4] = 1;
      mazeStructure[12][6] = 1;
      mazeStructure[13][6] = 1;
      mazeStructure[13][7] = 1;
      mazeStructure[12][3] = 1;
      mazeStructure[14][2] = 1;
      mazeStructure[14][3] = 1;
      mazeStructure[14][4] = 1;
      mazeStructure[14][10] = 1;
      mazeStructure[14][11] = 1;
      mazeStructure[14][9] = 1;
      mazeStructure[13][13] = 1;
      mazeStructure[13][14] = 1;

      function createMaze() {
        const walkableCells = [];

        for (let row = 0; row < 15; row++) {
          for (let col = 0; col < 15; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (mazeStructure[row][col] === 1) {
              cell.classList.add("wall");
            }

            if (row === startPosition.row && col === startPosition.col) {
              cell.classList.add("start");
            } else if (row === endPosition.row && col === endPosition.col) {
              cell.classList.add("end");
            }

            if (
              mazeStructure[row][col] !== 1 &&
              !(row === startPosition.row && col === startPosition.col) &&
              !(row === endPosition.row && col === endPosition.col)
            ) {
              cell.classList.add("walkable");
              walkableCells.push({ row, col });
            }

            maze.appendChild(cell);
          }
        }

        const selectedCells = [];

        for (let i = 0; i < 8; i++) {
          let randomIndex, randomCell;

          do {
            randomIndex = Math.floor(Math.random() * walkableCells.length);
            randomCell = walkableCells[randomIndex];
          } while (isAdjacentToSelected(randomCell));

          selectedCells.push(randomCell);

          walkableCells.splice(randomIndex, 1);

          const cellIndex = randomCell.row * 15 + randomCell.col;
          const cellElement = maze.children[cellIndex];
          cellElement.classList.add("selected");
        }

        updatePlayerPosition();

        function isAdjacentToSelected(cell) {
          for (const selectedCell of selectedCells) {
            const distance =
              Math.abs(cell.row - selectedCell.row) + Math.abs(cell.col - selectedCell.col);

            if (distance <= 1) {
              return true;
            }
          }
          return false;
        }
      }

function start_game(){
    createMaze();
    const mazeContainer = document.getElementById("mazeContainer");
    const startButton = document.getElementById("startButton");
    const mailButton1 = document.getElementById("mailButton1");
    const titleContainer = document.getElementById("titleContainer");
    const quitButton = document.getElementById('quitButton');
    const game = document.getElementById('game');
    startButton.addEventListener("click", function () {
      startButton.style.display = "none";
      mailButton1.style.display = "none";
      titleContainer.style.display = "none";
      mazeContainer.style.display = "block";
      quitButton.style.display = "block";
      const maze = document.getElementById("maze");
      const timerElement = document.getElementById("timer");
      let startTime;
      let endTime;
      let timerInterval;
      
      function movePlayer(direction) {
        const newRow = playerPosition.row + (direction === "ArrowDown" ? 1 : direction === "ArrowUp" ? -1 : 0);
        const newCol = playerPosition.col + (direction === "ArrowRight" ? 1 : direction === "ArrowLeft" ? -1 : 0);

        if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && mazeStructure[newRow][newCol] !== 1) {
          playerPosition.row = newRow;
          playerPosition.col = newCol;
          updatePlayerPosition();
          
          const currentCellIndex = playerPosition.row * 15 + playerPosition.col;
          const currentCell = document.getElementById('maze').children[currentCellIndex];

          if (currentCell.classList.contains('selected')) {
            alert("You passed a yellow cell! Spin the wheel!");
            mazeContainer.style.display = "none";
            currentCell.classList.remove("selected");
            show_wheel();
          }

          checkWin(); 
        }
      }

      function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
      }

      function stopTimer() {
        endTime = new Date();
        clearInterval(timerInterval);
        updateTimer();
      }

      function updateTimer() {
        const elapsedMilliseconds = endTime ? endTime - startTime : new Date() - startTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        timerElement.textContent = `Time: ${elapsedSeconds} s`;
      }

      function resetTimer() {
        clearInterval(timerInterval);
        startTime = undefined;
        endTime = undefined;
        timerElement.textContent = "Time: 0 seconds";
      }

      function checkWin() {
        if (playerPosition.row === endPosition.row && playerPosition.col === endPosition.col) {
          stopTimer();
          setTimeout(() => {
            alert("You won!\nTotal time: " + timerElement.textContent);
            resetGame();
          }, 100);
        }
      }

      quitButton.addEventListener('click', resetGame, false);
      function resetGame() {
        playerPosition = { row: startPosition.row, col: startPosition.col };
        updatePlayerPosition();
        resetTimer();
        startButton.style.display = "block";
        mailButton1.style.display = "block";
        titleContainer.style.display = "block";
        mazeContainer.style.display = "none";
        quitButton.style.display = "none";
      }

      document.addEventListener("keydown", function (event) {
        const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (arrowKeys.includes(event.key)) {
          if (startTime === undefined && mazeStructure[startPosition.row][startPosition.col] !== 1) {
            startTimer();
          }
          movePlayer(event.key);
        }
      });
    });
}
window.addEventListener('load', start_game, false);