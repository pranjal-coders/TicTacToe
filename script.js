const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const initializeBoard = () => {
boardElement.innerHTML = '';
gameState.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.id = index;
    cellElement.className = 'cell';
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
});
};

const handleCellClick = (e) => {
const cellIndex = parseInt(e.target.id);
if (gameState[cellIndex] !== '' || !gameActive) 
    return;

gameState[cellIndex] = currentPlayer;
e.target.textContent = currentPlayer;

if (checkWin()) {
    messageElement.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
}

currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
messageElement.textContent = `${currentPlayer}'s turn`;
};

const checkWin = () => {
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
];

return winConditions.some(condition => {
    if (gameState[condition[0]] === '' || gameState[condition[1]] === '' || gameState[condition[2]] === '') 
        return false;
    return gameState[condition[0]] === gameState[condition[1]] && gameState[condition[1]] === gameState[condition[2]];
});
};

const restartGame = () => {
currentPlayer = 'X';
gameState = ['', '', '', '', '', '', '', '', ''];
gameActive = true;
messageElement.textContent = "Player X's turn";
initializeBoard();
};

restartButton.addEventListener('click', restartGame);

initializeBoard();