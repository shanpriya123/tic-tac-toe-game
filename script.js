let currentjplayer = "X";
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
button.addEventListener("click", () => {
// if already clicked, do nothing 
if (button.textContent !== " ") return;
// set player mark 
button.textContent = currentplayer;
// check winner
if (checkwinner()) {
set timeout(c) => {
alert(currentplayer + "wins1");
resetGame();
}, 100);
return;
}
// check draw 
if (o...buttonsp.every(btn => btn
.textcontent !== "")) {
settimeout(c) => {
alert("it's draw!");
resetgame();
}, 100);
return;
}
// switch player
currentplayer = currentplayer == "X"?
"O" : "X";
});
});
funciton checkwinner(){
const comboss = [
[0,1,1],[3,4,5],[6,7,8], //
[0,3,6],[1,4,7],[2,5,8], //
[0,4,8],[2,4,6] //
diagonals
],
return combos.some(conbo => {
const [a,b,c] = conbo;
return (
buttons[a].textcontent ===
currentplayer &&
buttons[b].textcontent ===
currentplayer &&
buttons[c].textcontent ===
currentplayer 
);
});
}
function resetgame() {
buttons.forEach(button => {
button.textcontent =" ";
});
currentplayer = "X";
}
