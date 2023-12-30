const boardSize = 10;
const mineCount = 10;
let board = [];
let revealedCount = 0;

function initializeBoard() {
  board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      mineCount: 0,
    }))
  );

  revealedCount = 0;
  placeMines();
  calculateMineCounts();
}

function placeMines() {
  for (let i = 0; i < mineCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    } while (board[x][y].isMine);

    board[x][y].isMine = true;
  }
}

function calculateMineCounts() {
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      if (board[x][y].isMine) {
        continue;
      }

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny].isMine) {
            board[x][y].mineCount++;
          }
        }
      }
    }
  }

  for(let x=0; x<boardSize; x++){
    var content = '';
    for(let y=0; y<boardSize; y++){
      if(board[x][y].isMine) content += 'M';
      else content += String(board[x][y].mineCount);
    }
    console.log(content);
  }
  console.log('\n');
}

function revealCell(x, y) {
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y].isRevealed || board[x][y].isFlagged) {
    return;
  }

  const cell = document.getElementById(`cell-${x}-${y}`);
  board[x][y].isRevealed = true;
  cell.classList.remove('hidden');

  if (board[x][y].isMine) {
    cell.classList.add('mine');
    alert('Game Over! You stepped on a mine.');
    initializeBoard();
    renderBoard();
  } else {
    revealedCount++;
    if(board[x][y].mineCount > 0)
      cell.textContent = board[x][y].mineCount;
    if (board[x][y].mineCount === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          revealCell(x + dx, y + dy);
        }
      }
    }
    if (revealedCount === boardSize * boardSize - mineCount) {
      alert('Congratulations! You found all the mines. You win!');
      const boardElement = document.getElementById('board');
      boardElement.innerHTML = '';
      mazeContainer.style.display = "flex";
      game.style.display = 'none';
    }
  }
}

function flagCell(x, y) {
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y].isRevealed) {
    return;
  }

  const cell = document.getElementById(`cell-${x}-${y}`);
  board[x][y].isFlagged = !board[x][y].isFlagged;

  if (board[x][y].isFlagged) {
    cell.classList.add('flag');
  } else {
    cell.classList.remove('flag');
  }

  return false; // Prevent context menu from showing up
}

function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement('div');
      cell.id = `cell-${x}-${y}`;
      cell.classList.add('cells', 'hidden');
      cell.addEventListener('click', () => revealCell(x, y));
      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        flagCell(x, y);
      });
      boardElement.appendChild(cell);
    }
  }
}

function start_minesweeper(){
    initializeBoard();
    renderBoard();   
}