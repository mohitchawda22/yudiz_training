// const grid = document.getElementById("grid");
// const input = document.getElementById("input");
// let board = new Map();

// const colors = [
//   "red",
//   "blue",
//   "green",
//   "yellow",
//   "orange",
//   "purple",
//   "pink",
//   "brown",
//   "gray",
// ];


// let regionMap;

// let n = parseInt(input.value);

// function matrixBoard() {
//   grid.innerHTML = "";
//   const n = parseInt(input.value);
//   grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//       board.set(`${i},${j}`, { hasQueen: false });
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.style.background = regionColors(i, j,n);
//       cell.dataset.row = i;
//       cell.dataset.col = j;
//       grid.addEventListener("click", PlacedQueens);
//       grid.appendChild(cell);
//     }
//   }
//   console.log(board);
// }

// function isSafe(row, col, board, n) {
//   for (let i = 0; i < row; i++) {
//     if (board.get(`${i},${col}`).hasQueen) return false;
//   }
//   for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
//     if (board.get(`${i},${j}`).hasQueen) return false;
//   }
//   for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
//     if (board.get(`${i},${j}`).hasQueen) return false;
//   }
//   return true;
// }

// function PlacedQueens(event) {
//   let cell = event.target;
//   let i = cell.dataset.row;
//   let j = cell.dataset.col;
//   let key = `${i},${j}`;

//   if (i===n || j===n) {
//     document.getElementById("result").textContent = "All queens placed";
//     return
//   };

//   if (board.get(key).hasQueen) {
//     board.set(key, { hasQueen: false });
//     cell.innerHTML = "";
//   } else {
//     board.set(key, { hasQueen: true });
//     cell.innerHTML = "👑";
//   }
// }

// function checkSolution(){

// }

// function startGame() {
//   const rows = new Set();
//   const cols = new Set();
//   const regions = new Set();
//   const valid = true;
//   for (let i = 0; i < n; i++) {
//     let key = `${i},${j}`;
//     if (board.get(key).hasQueen) {
//       console.log("Queen placed already")
//       const [i, j] = key.split(",").board(Number);
//       const region = Math.floor(i / 2) * 2 + Math.floor(j / 2);
//       rows.set(i, (rows.get(i) || 0) + 1);
//       cols.set(j, (cols.get(j) || 0) + 1);
//       regions.set(region, (regions.get(region) || 0) + 1);
//       if (
//         rows.get(i) > 1 ||
//         cols.get(j) > 1 ||
//         regions.get(region) > 1 ||
//         board.get(adjacentQueens(i, j))
//       ) {
//         valid = false;
//       }
//     }
//   }
//   document.getElementById("result").textContent = valid? "Valid" : "Invalid";
// }

// function resetGame() {
//   board.clear();
//   matrixBoard();
// }

// function adjacentQueens(i, j) {
//   const directions = [
//     [0, 1], // right
//     [1, 0], // down
//     [0, -1], // left
//     [-1, 0], // up
//     [1, 1], // diagonal down-right
//     [1, -1], // diagonal down-left
//     [-1, 1], // diagonal up-right
//     [-1, -1],
//   ];
//   board.set(`${i},${j}`, { hasQueen: true });
//   for (const [dx, dy] of directions) {
//     const x = i + dx;
//     const y = j + dy;
//     if (x >= 0 && x < n && y >= 0 && y < n) {
//       if (!board.get(`${x},${y}`).hasQueen) {
//         board.set(`${x},${y}`, { hasQueen: false });
//       }
//     }
//   }
// }

// input.addEventListener("change", matrixBoard);
// // console.log(makeBoard(n));
// matrixBoard();
// // makeBoard(n);

const grid = document.getElementById("grid");
const input = document.getElementById("input");
let board = new Map();

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "gray",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createRandomRegions(n) {
  // Create n regions with approximately equal size
  let regions = new Array(n * n).fill(0);
  let cellsPerRegion = Math.ceil((n * n) / n);

  // Assign sequential region numbers
  for (let i = 0; i < n * n; i++) {
    regions[i] = Math.floor(i / cellsPerRegion) % n;
  }

  // Shuffle the regions
  for (let i = regions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [regions[i], regions[j]] = [regions[j], regions[i]];
  }

  return regions;
}

let regionMap;

function regionColors(i, j, n) {
  if (!board.regionMap || board.regionMap.length !== n * n) {
    board.regionMap = createRandomRegions(n);
  }
  const index = i * n + j;
  return colors[board.regionMap[index]];
}

function overWiteColor(row, col, queenColor, board, n) {
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
    [1, 1], // diagonal down-right
    [1, -1], // diagonal down-left
    [-1, 1], // diagonal up-right
    [-1, -1], // diagonal up-left
  ];
  board.set(`${row},${col}`, {
    hasQueen: true,
    color: queenColor,
  });
  for (const [dx, dy] of directions) {
    const x = row + dx;
    const y = col + dy;
    if (x >= 0 && x < n && y >= 0 && y < n) {
      const cell = board.get(`${x},${y}`);
      if (!cell.hasQueen) {
        board.set(`${x},${y}`, {
          hasQueen: false,
          color: queenColor,
        });
      }
    }
  }
}

let n = parseInt(input.value);

function matrixBoard() {
  grid.innerHTML = "";
  n = parseInt(input.value);
  grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  board.clear();

  // Create new random regions
  board.regionMap = createRandomRegions(n);
  // overWiteColor(0, 0, colors, board, n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const color = regionColors(i, j, n);
      board.set(`${i},${j}`, {
        hasQueen: false,
        color: color,
      });

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.backgroundColor = color;
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", PlacedQueens);
      grid.appendChild(cell);
    }
  }
}

function isSafe(row, col, board, n) {
  // Check vertical
  for (let i = 0; i < row; i++) {
    if (board.get(`${i},${col}`).hasQueen) return false;
  }

  // Check upper left diagonal
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board.get(`${i},${j}`).hasQueen) return false;
  }

  // Check upper right diagonal
  for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
    if (board.get(`${i},${j}`).hasQueen) return false;
  }

  return true;
}

function PlacedQueens(event) {
  let cell = event.target;
  let i = parseInt(cell.dataset.row);
  let j = parseInt(cell.dataset.col);
  let key = `${i},${j}`;

  if (i === n || j === n) {
    document.getElementById("result").textContent = "All queens placed";
    return;
  }

  if (board.get(key).hasQueen) {
    board.set(key, {
      hasQueen: false,
      color: cell.style.backgroundColor,
    });
    cell.innerHTML = "";
  } else {
    if (isSafe(i, j, board, n)) {
      board.set(key, {
        hasQueen: true,
        color: cell.style.backgroundColor,
      });
      cell.innerHTML = "👑";
    } else {
      document.getElementById("result").textContent = "Invalid move!";
      setTimeout(() => {
        document.getElementById("result").textContent = "";
      }, 2000);
    }
  }
}

function checkSolution() {
  let queensCount = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board.get(`${i},${j}`).hasQueen) {
        queensCount++;
      }
    }
  }

  const isValid = queensCount === n;
  document.getElementById("result").textContent = isValid
    ? "Valid solution! All queens placed correctly."
    : "Invalid solution. Need exactly " + n + " queens.";
}

function resetGame() {
  board.clear();
  document.getElementById("result").textContent = "";
  matrixBoard();
}

input.addEventListener("change", matrixBoard);
matrixBoard();
