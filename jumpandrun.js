// jumpandrun/jumpandrun.js

const canvas = document.createElement('canvas');
document.getElementById('game-container').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

const player = {
    x: 50,
    y: 250,
    width: 30,
    height: 50,
    color: 'blue',
    velocityY: 0,
    gravity: 0.8,
    jumpPower: -12,
    grounded: false
};

const ground = { y: 280, height: 20 };

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawGround() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, ground.y, canvas.width, ground.height);
}

function updatePlayer() {
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y > ground.y - player.height) {
        player.y = ground.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
    } else {
        player.grounded = false;
    }
}

function jump() {
    if (player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        jump();
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    updatePlayer();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();
