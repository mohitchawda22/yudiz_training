let boardSize = 0;
const gameBoard = new Map();
let regions = [];

function isSafe(map, row, col, n) {
  
  for (let i = 0; i < n; i++) {
    if (map.get(`${row},${i}`) === "Q" || map.get(`${i},${col}`) === "Q") {
      return false;
    }
  }

  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
    [-1, -1], // upper left diagonal
    [-1, 1],  // upper right diagonal
    [1, -1],  // lower left diagonal
    [1, 1]    // lower right diagonal
  ];

  for (let [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
      if (map.get(`${newRow},${newCol}`) === "Q") {
        return false;
      }
    }
  }

  return true;
}

function RandomSolution(n) {
  let map = new Map();
  while (!solveNQueensDirect(map, n)) {
    map = new Map();
  }
  let board = [];
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i][j] = "-";
    }
  }
  for (let [key, value] of map.entries()) {
    if (value === "Q") {
      let [row, col] = key.split(",").map(Number);
      board[row][col] = "Q";
    }
  }
  return board;
}

function solveNQueensDirect(map, n) {
  let availableCols = new Set();
  for (let i = 0; i < n; i++) {
    availableCols.add(i);
  }
  for (let row = 0; row < n; row++) {
    let cols = Array.from(availableCols);
    if (cols.length === 0) return false;
    let col = cols[Math.floor(Math.random() * cols.length)];
    if (!isSafe(map, row, col, n)) return false;
    map.set(`${row},${col}`, "Q");
    availableCols.delete(col);
  }
  return true;
}

function QueenColor(board, n) {
  let regions = [];
  for (let i = 0; i < n; i++) {
    regions[i] = [];
    for (let j = 0; j < n; j++) {
      regions[i][j] = null;
    }
  }
  const colors = [
    "red",
    "violet",
    "yellow",
    "green",
    "blue",
    "orange",
    "black",
    "pink",
    "brown",
  ];
  let colorIndex = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (board[row][col] === "Q") {
        regions[row][col] = colors[colorIndex % colors.length];
        colorIndex++;
      }
    }
  }
  return regions;
}

function getAvailableCells(regions, n) {
  let availableCells = [];
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!regions[row][col]) {
        availableCells.push({ row, col });
      }
    }
  }
  return availableCells;
}

function pickRandomCell(availableCells) {
  let randomIndex = Math.floor(Math.random() * availableCells.length);
  return availableCells.splice(randomIndex, 1)[0];
}

function getNearColor(regions, row, col, n) {
  let nearColor = new Set();
  const directions = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
    // [1, -1],
  ];
  for (let [dx, dy] of directions) {
    let newRow = row + dx;
    let newCol = col + dy;
    if (
      newRow >= 0 &&
      newRow < n &&
      newCol >= 0 &&
      newCol < n &&
      regions[newRow][newCol]
    ) {
      nearColor.add(regions[newRow][newCol]);
    }
  }
  return nearColor;
}

function assignColor(regions, row, col, nearColor) {
  if (nearColor.size > 0) {
    let colors = Array.from(nearColor);
    regions[row][col] = colors[Math.floor(Math.random() * colors.length)];
  }
}

function fillRegions(regions, n) {
  let availableCells = getAvailableCells(regions, n);
  while (availableCells.length > 0) {
    let cell = pickRandomCell(availableCells);
    let nearColor = getNearColor(regions, cell.row, cell.col, n);
    if (nearColor.size === 0) {
      availableCells.push(cell);
      continue;
    }
    assignColor(regions, cell.row, cell.col, nearColor);
  }
  return regions;
}

function generateGrid(boardSize, regions = null) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (regions && regions[row][col]) {
        cell.style.backgroundColor = regions[row][col];
      }
      grid.appendChild(cell);
      cell.addEventListener("click", placeQueen);
    }
  }
}

function placeQueen(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  const result=document.getElementById("result")

  if (gameBoard.get(`${row},${col}`) === "Q") {
    gameBoard.delete(`${row},${col}`);
    event.target.textContent = "";
    result.innerHTML=""
    event.target.classList.remove("queen");
  } else {
    if (!isSafe(gameBoard, row, col, boardSize)) {
      result.style.color="red"
      result.innerHTML="Invalid position! Queens cannot attack each other."
      return;
    }
    for (let [key] of gameBoard.entries()) {
      let [r, c] = key.split(",").map(Number);
      if (regions[r][c] === regions[row][col]) {
        result.style.color="red"
        result.innerHTML="This region already contains a queen of the same color."
        return;
      }
    }
    gameBoard.set(`${row},${col}`, "Q");
    event.target.textContent = "👑";
    result.innerHTML=""
    event.target.style.fontSize="24px"
    event.target.classList.add("queen");
  }

  if (gameBoard.size === boardSize) {
    setTimeout(() => {
      result.style.color="green"
      result.innerHTML="Congratulations🥳! You've successfully placed all queens."
    }, 300);
  }
}

function startGame() {
  boardSize = parseInt(document.getElementById("boardsize").value);
  if (isNaN(boardSize) || boardSize < 5 || boardSize > 10) {
    alert("Please enter a valid board size between 5 and 10.");
    return;
  }

  gameBoard.clear();
  const board = RandomSolution(boardSize);
  regions = QueenColor(board, boardSize);
  regions = fillRegions(regions, boardSize);
  generateGrid(boardSize, regions);
  console.log(board);
}