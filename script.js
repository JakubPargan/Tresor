function checkPassword() {
    const password = document.getElementById("password").value;
    if (password === "1234") {
        document.getElementById("login").style.display = "none";
        document.getElementById("game-selection").style.display = "block";
    } else {
        alert("Falsches Passwort!");
    }
}

function startGame(game) {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = '';  // Lösche den Container

    if (game === 'tetris') {
        loadTetris();
    } else if (game === 'jumpandrun') {
        loadJumpAndRun();
    } else if (game === 'chess') {
        loadChess();
    }
}

function loadTetris() {
    const script = document.createElement("script");
    script.src = "tetris/tetris.js";  // Tetris-Spielcode
    document.getElementById("game-container").appendChild(script);
}

function loadJumpAndRun() {
    const script = document.createElement("script");
    script.src = "jumpandrun/jumpandrun.js";  // Jump and Run-Spielcode
    document.getElementById("game-container").appendChild(script);
}

function loadChess() {
    const script = document.createElement("script");
    script.src = "chess/chess.js";  // Schach-Spielcode
    document.getElementById("game-container").appendChild(script);
}
