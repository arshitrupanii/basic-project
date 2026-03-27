const cell = document.querySelectorAll(".cell");
const restart = document.querySelector(".restart");
const winText = document.querySelector(".winText");
const turnText = document.querySelector(".turnText");
const modeButtons = document.querySelectorAll(".modeBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let gameMode = "friend";
let gameOver = false;

const winPro = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWin = () => {
    for (let i = 0; i < winPro.length; i++) {
        const [a, b, c] = winPro[i];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winText.textContent = `${board[a]} Win 🎉 !!`;
            gameOver = true;
            break;
        }
    }

    const hasEmpty = board.some(item => item === "");
    !hasEmpty ? winText.textContent = `Draw !!` : '';
};

// dom manipulation 
const DisplayBoard = () => {
    let i = 0;

    cell.forEach((ele) => {
        ele.textContent = board[i++];
    });
};

// that function fill X O in block
const Move = (target) => {
    // check fill if filled then return nothing
    if (board[target] !== "") return;

    if (turn == "O") {
        board[target] = "O";
        turn = "X";
    } else if (turn == "X") {
        board[target] = "X";
        turn = "O";
    }
    turnText.textContent = `Turn : ${turn}`
};

// computer move
const computerMove = () => {
    let emptyBoard = []

    // it store empty cell
    for (let i = 0; i < board.length; i++) {
        if(board[i].trim() === "") emptyBoard.push(i);
    }

    const randomIndex = Math.floor(Math.random() * emptyBoard.length);
    Move(emptyBoard[randomIndex]);
}

// -----------Start-----------

cell.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        let target = e.target.dataset.cellIndex;

        if(!gameOver){
            Move(target);
    
            if(gameMode == 'computer') computerMove();
    
            DisplayBoard();
            checkWin();
        }
    });
});

restart.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    winText.textContent = "";

    DisplayBoard();
});

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active from all
    modeButtons.forEach(a => a.classList.remove("active"));

    // add active to clicked
    btn.classList.add("active");

    // set mode
    gameMode = btn.dataset.mode;
  });
});