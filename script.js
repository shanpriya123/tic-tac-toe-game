if (checkWinner()) {
  document.getElementById("result").innerText = currentPlayer + " Wins!";
} else if (moves === 9) {
  document.getElementById("result").innerText = "It's a Draw!";
}
