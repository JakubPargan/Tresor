// tetris/tetris.js

const canvas = document.createElement('canvas');
document.getElementById('game-container').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 600;

const ROWS = 20;
const COLUMNS = 10;
const BLOCK_SIZE = 30;

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#F1C40F', '#9B59B6', '#1ABC9C'];

const tetrominoes = [
    [[1, 1, 1], [0, 1, 0]], // T-shape
    [[1, 1], [1, 1]],       // O-shape
    [[0, 1, 1], [1, 1, 0]], // S-shape
    [[1, 1, 0], [0, 1, 1]], // Z-shape
    [[1, 1, 1, 1]],         // I-shape
    [[1, 1, 1], [1, 0, 0]], // L-shape
    [[1, 1, 1], [0, 0, 1]]  // J-shape
];

let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));

let currentTetromino = randomTetromino();
let currentPos = { x: 3, y: 0 };

function randomTetromino() {
    const tetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    return {
        shape: tetromino,
        color: colors[Math.floor(Math.random() * colors.length)]
    };
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the board
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (board[row][col]) {
                ctx.fillStyle = board[row][col];
                ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }

    // Draw the current tetromino
    for (let row = 0; row < currentTetromino.shape.length; row++) {
        for (let col = 0; col < currentTetromino.shape[row].length; col++) {
            if (currentTetromino.shape[row][col]) {
                ctx.fillStyle = currentTetromino.color;
                ctx.fillRect((currentPos.x + col) * BLOCK_SIZE, (currentPos.y + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

function moveTetromino() {
    currentPos.y++;
    if (collides()) {
        currentPos.y--;
        placeTetromino();
        clearFullLines();
        currentTetromino = randomTetromino();
        currentPos = { x: 3, y: 0 };
    }
    drawBoard();
}

function collides() {
    for (let row = 0; row < currentTetromino.shape.length; row++) {
        for (let col = 0; col < currentTetromino.shape[row].length; col++) {
            if (currentTetromino.shape[row][col]) {
                const newX = currentPos.x + col;
                const newY = currentPos.y + row;

                if (newY >= ROWS || newX < 0 || newX >= COLUMNS || (newY >= 0 && board[newY][newX])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function placeTetromino() {
    for (let row = 0; row < currentTetromino.shape.length; row++) {
        for (let col = 0; col < currentTetromino.shape[row].length; col++) {
            if (currentTetromino.shape[row][col]) {
                board[currentPos.y + row][currentPos.x + col] = currentTetromino.color;
            }
        }
    }
}

function clearFullLines() {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== null)) {
            board.splice(row, 1);
            board.unshift(Array(COLUMNS).fill(null));
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        moveTetromino();
    }
});

setInterval(moveTetromino, 500); // Move tetromino every 500 ms
