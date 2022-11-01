let playerTxt = document.querySelector('#turn');
let errorTxt = document.querySelector('#error');
let boxes = document.querySelectorAll('.box');
let player = 'X';
let gameOver = false;
let winner = "";

playerTxt.textContent = player + "'s Turn";

boxes.forEach(box => box.addEventListener('click',() => chooseBox(box)));

function chooseBox (box) {
    if(box.textContent === ""){
        box.textContent = player;
        if(player === "X"){
            box.style.color = "pink";
        }else{
            box.style.color = "chartreuse";
        }
        changePlayer();
    }else {
        errorTxt.textContent = "That box is already taken !"
        box.style.border = "1px solid red";
        setTimeout(function(){
         box.style.border = "1px solid darkred";
         errorTxt.textContent = "";
        },2000)
    }
    checkWin();
    checkTie();
    
    if(gameOver) {
        playerTxt.textContent = 'Game Over, ' + winner + " Won !";
        boxes.forEach(box => box.style.pointerEvents = 'none');
        createButton();
    }
}

function changePlayer() {
    if(player === 'X') {
        player = 'O';
        playerTxt.textContent = player + "'s Turn";
    }else if(player === 'O') {
        player = 'X';
        playerTxt.textContent = player + "'s Turn";
    }
}

function checkTie() {
    const boxvals = [];
    boxes.forEach(box => boxvals.push(box.textContent));
    if(!boxvals.includes("") && !gameOver) {
        playerTxt.textContent = 'TIE !'
        boxes.forEach(box => box.style.pointerEvents = 'none');
        createButton();
    }
}

function checkWin () {
    rowsControl();
    columnsControl();
    diagsControl();
}

function rowsControl () {
    let row1 = boxes[0].textContent === boxes[1].textContent && boxes[0].textContent === boxes[2].textContent && boxes[0].textContent !== "";
    let row2 = boxes[3].textContent === boxes[4].textContent && boxes[3].textContent === boxes[5].textContent && boxes[3].textContent !== "";
    let row3 = boxes[6].textContent === boxes[7].textContent && boxes[6].textContent === boxes[8].textContent && boxes[6].textContent !== "";
    if(row1 || row2 || row3) {
        gameOver = true;
    }
    if(row1) winner = boxes[0].textContent;
    if(row2) winner = boxes[3].textContent;
    if(row3) winner = boxes[6].textContent;
}

function columnsControl () {
    let col1 = boxes[0].textContent === boxes[3].textContent && boxes[0].textContent === boxes[6].textContent && boxes[0].textContent !== "";
    let col2 = boxes[1].textContent === boxes[4].textContent && boxes[1].textContent === boxes[7].textContent && boxes[1].textContent !== "";
    let col3 = boxes[2].textContent === boxes[5].textContent && boxes[2].textContent === boxes[8].textContent && boxes[2].textContent !== "";
    if(col1 || col2 || col3) {
        gameOver = true;
    }
    if(col1) winner = boxes[0].textContent;
    if(col2) winner = boxes[1].textContent;
    if(col3) winner = boxes[2].textContent;
}

function diagsControl () {
    let diag1 = boxes[0].textContent === boxes[4].textContent && boxes[0].textContent === boxes[8].textContent && boxes[0].textContent !== "";
    let diag2 = boxes[2].textContent === boxes[4].textContent && boxes[2].textContent === boxes[6].textContent && boxes[2].textContent !== "";
    if(diag1 || diag2) {
        gameOver = true;
    }
    if(diag1) winner = boxes[0].textContent;
    if(diag2) winner = boxes[2].textContent;
}
function createButton() {

  const btn = document.createElement("button");
  btn.innerHTML = "NEW GAME";
  document.body.appendChild(btn);
  btn.setAttribute('id','button');
  btn.addEventListener('click',() => {
     document.location.reload();
 });

}