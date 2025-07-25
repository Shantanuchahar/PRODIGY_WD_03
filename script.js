const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');

const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn = false;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setStatusMessage("Player X's turn");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  cell.classList.add(currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
    setStatusMessage(`Player ${oTurn ? "O" : "X"}'s turn`);
  }
}

function endGame(draw) {
  if (draw) {
    statusMessage.textContent = "It's a draw!";
  } else {
    statusMessage.textContent = `Player ${oTurn ? "O" : "X"} wins!`;
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function setStatusMessage(message) {
  statusMessage.textContent = message;
}
