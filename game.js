let score = 0;
let timeLeft = 60;
let gameActive = false;
let timerInterval;
let moveInterval;
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameContainer = document.getElementById('game-container');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');

// Área segura para evitar sobreposição com HUD
const safeArea = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

function getRandomPosition() {
    return {
        x: safeArea.left + Math.random() * (600 - safeArea.left - safeArea.right),
        y: safeArea.top + Math.random() * (400 - safeArea.top - safeArea.bottom)
    };
}

function startGame() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameActive = true;
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    updateTimer();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    showTarget();
    startMoving();
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    clearInterval(moveInterval);
    target.style.display = 'none';
    
    finalScore.textContent = `Sua pontuação: ${score}`;
    gameContainer.classList.add('hidden');
    endScreen.classList.remove('hidden');
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showTarget() {
    if (!gameActive) return;
    
    target.style.display = 'none';
    setTimeout(() => {
        const pos = getRandomPosition();
        target.style.left = `${pos.x}px`;
        target.style.top = `${pos.y}px`;
        target.style.display = 'block';
    }, 100);
}

function startMoving() {
    moveInterval = setInterval(() => {
        if (gameActive) {
            showTarget();
        }
    }, 1500);
}

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

target.addEventListener('click', () => {
    if (!gameActive) return;
    
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    showTarget();
});