const players = { 
  player1: { type: 'human', symbol: 'X'},
  player2: { type: 'ai', symbol: 'O'}
};
let CurrentPlayer = 'player1';
const board = Array(a).fill(null);
function playTurn(index) {
  if (board[index] === null) {
    board[index] = players[CurrentPlayer].symbol;
    CurrentPlayer = (CurrentPlayer === 'player1')? 'player2':'player1';
    if (players[currentplayer].type === 'ai') {
      const aiMove = getBestMove(board,players[CurrentPlayer].symbol);
      playTurn(aiMove);
    }
  }
}
