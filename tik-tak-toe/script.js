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

    if (!board.includes("") && !gameOver) {
        winText.textContent = "Draw 🤝";
        gameOver = true;
    }
};

// dom manipulation 
const DisplayBoard = () => {
    cell.forEach((ele, i) => {
        ele.textContent = board[i];
    });
};

// that function fill X O in block
const Move = (target) => {
    // check fill if filled then return nothing
    if (board[target] !== "" || gameOver) return;

    board[target] = turn;
    turn = turn === "X" ? "O" : "X";

    turnText.textContent = `Turn : ${turn}`
};

// computer move
const computerMove = () => {
    if (gameOver) return;

    let empty = board
        .map((val, i) => val === "" ? i : null)
        .filter(v => v !== null);

    if (empty.length === 0) return;

    let randomIndex = empty[Math.floor(Math.random() * empty.length)];

    // delay = more natural
    setTimeout(() => {
        Move(randomIndex);
        DisplayBoard();
        checkWin();
    }, 400);
}

// -----------Start-----------

cell.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        let target = e.target.dataset.cellIndex;

        if (gameOver) return;

        Move(target);
        DisplayBoard();
        checkWin();

        if (gameMode === "computer" && turn === "O" && !gameOver) {
            computerMove();
        }
    });
});

restart.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    winText.textContent = "";
    gameOver = false;

    turnText.textContent = `Turn : ${turn}`
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
        restart.click();
    });
});