const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

let player, obstacles, score, gameInterval, isGameOver;

function initGame() {
    player = { x: 180, y: 450, width: 40, height: 40, speed: 5 };
    obstacles = [];
    score = 0;
    isGameOver = false;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("status").innerText = "Gunakan panah kiri/kanan untuk bergerak!";
    startButton.style.display = "none";
}

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += 3; 
        if (obstacle.y > canvas.height) {
            obstacles.splice(obstacles.indexOf(obstacle), 1);
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }
    });

    if (Math.random() < 0.02) {
        let width = Math.random() * 60 + 20;
        obstacles.push({ x: Math.random() * (canvas.width - width), y: 0, width: width, height: 20 });
    }
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameOver();
        }
    });
}

function gameOver() {
    clearInterval(gameInterval);
    document.getElementById("status").innerText = "Game Over!";
    startButton.style.display = "block";
    startButton.innerText = "Restart";
    isGameOver = true;
}

function updateGame() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    updateObstacles();
    checkCollision();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
});

function startGame() {
    initGame();
    gameInterval = setInterval(updateGame, 20);
}