// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const homeButton = document.getElementById('home-button');
const gameBoard = document.getElementById('game-board');
const timeElement = document.getElementById('time');
const finalTimeElement = document.getElementById('final-time');
const winMessage = document.getElementById('win-message');
const loseMessage = document.getElementById('lose-message');

// Variables del juego
let timer = null;
let timeLeft = 45;
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// Personajes y dragones del juego
const characters = [
    { name: 'Hiccup', image: 'hiccup2.png' },
    { name: 'Astrid', image: 'astrid.png' },
    { name: 'Toothless', image: 'toothless2.png' },
    { name: 'Furia', image: 'furia.png' },
    { name: 'Stoick', image: 'stoick.png' },
    { name: 'Gobber', image: 'gobber.png' },
    { name: 'Drago', image: 'drago.png' },
    { name: 'Valka', image: 'valka.png' }
];

// Función para iniciar el juego
function startGame() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    initializeGame();
    startTimer();
}

// Función para reiniciar el juego
function restartGame() {
    resultScreen.classList.remove('active');
    gameScreen.classList.add('active');
    resetGame();
    initializeGame();
    startTimer();
}

// Función para volver al inicio
function goHome() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    resetGame();
}

// Función para inicializar el juego
function initializeGame() {
    gameBoard.innerHTML = '';
    const gameCards = [...characters, ...characters]
        .sort(() => Math.random() - 0.5)
        .map((character, index) => createCard(character, index));
    
    gameBoard.append(...gameCards);
}

// Función para crear una carta
function createCard(character, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.cardIndex = index;
    card.dataset.character = character.name;

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.style.backgroundImage = `url('images/${character.image}')`;
    cardFront.style.backgroundSize = 'cover';
    cardFront.style.backgroundPosition = 'center';

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', () => flipCard(card));
    return card;
}

// Función para voltear una carta
function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

// Función para verificar si las cartas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.character === card2.dataset.character;

    if (match) {
        matchedPairs++;
        flippedCards = [];
        canFlip = true;
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Función para verificar si el jugador ganó
function checkWin() {
    if (matchedPairs === characters.length) {
        endGame(true);
    }
}

// Función para iniciar el temporizador
function startTimer() {
    timeLeft = 45;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

// Función para actualizar el temporizador
function updateTimer() {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame(false);
    }
}

// Función para finalizar el juego
function endGame(isWin) {
    clearInterval(timer);
    gameScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    if (isWin) {
        winMessage.style.display = 'block';
        loseMessage.style.display = 'none';
        finalTimeElement.textContent = 45 - timeLeft;
    } else {
        winMessage.style.display = 'none';
        loseMessage.style.display = 'block';
    }
}

// Función para reiniciar las variables del juego
function resetGame() {
    timeLeft = 45;
    matchedPairs = 0;
    flippedCards = [];
    canFlip = true;
    timeElement.textContent = '45';
    clearInterval(timer);
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
homeButton.addEventListener('click', goHome); 