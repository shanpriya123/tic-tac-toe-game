let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function handleClick(event) {
  const index = event.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
statusDisplay.textContent = "Player X's turn";
