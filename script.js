const colors = ['red', 'blue', 'yellow', 'purple'];
let gameSequence = [];
let playerSequence = [];
let started = false;
let level = 0;
let highestScore = 0;

const statusElement = document.getElementById('status');
const highestScoreElement = document.getElementById('highest-score');
const boxes = colors.map(color => document.getElementById(color));

document.addEventListener('keypress', startGame);

function startGame() {
    if (started) return;
    started = true;
    resetGame();
    levelUp();
}

function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
}

function levelUp() {
    playerSequence = [];
    level++;
    statusElement.innerText = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    playSequence();
}

function playSequence() {
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            const btn = document.getElementById(color);
            flashButton(btn);
        }, (index + 1) * 500);
    });
}

function flashButton(btn) {
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 300);
}

boxes.forEach(box => {
    box.addEventListener('click', handleBoxClick);
});

function handleBoxClick() {
    if (!started) return;
    const color = this.id;
    flashButton(this);
    playerSequence.push(color);
    checkAnswer(playerSequence.length - 1);
}

function checkAnswer(currentLevel) {
    if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
        if (playerSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        endGame();
    }
}

function endGame() {
    if (level - 1 > highestScore) {
        highestScore = level - 1;
        highestScoreElement.innerText = `Highest Score: ${highestScore}`;
    }

    showRedBlink();
    statusElement.innerText = `Game Over! Your score: ${level - 1}. Press any key to restart.`;
    started = false;
}

function showRedBlink() {
    const redBlink = document.createElement('div');
    redBlink.classList.add('red-blink');
    document.body.appendChild(redBlink);

    setTimeout(() => {
        document.body.removeChild(redBlink);
    }, 500);
}