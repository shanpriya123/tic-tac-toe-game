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



function getBestMove(board,symbol) {
  // implement minimax logic here
// returns index (0to8) fir best move
}

// function to create player based on user choice 
function create players(mode) {
  if (mode === 'single') {
    return {
      player1: {type: 'human', symbol: 'X' },
      player2: {type: 'ai', symbol: 'O' }
    };
  } else if (mode === 'multi') {
    return {
