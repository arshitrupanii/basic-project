const cell = document.querySelectorAll(".cell");
const restart = document.querySelector(".restart");
const winText = document.querySelector(".winText");
const turnText = document.querySelector(".turnText");

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";

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
            winText.textContent = `${board[a]} Win 🎉 !!`
        }
    }
};

const DisplayBoard = () => {
    let i = 0;

    cell.forEach((ele) => {
        ele.textContent = board[i++];
    });
};

const addMove = (target) => {
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

cell.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        let target = e.target.dataset.cellIndex;

        addMove(target);

        DisplayBoard();
        checkWin();
    });
});

restart.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    winText.textContent = "";

    DisplayBoard();
});