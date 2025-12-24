console.log("Tic Tac Toe Loaded");

let turn = "X";
let gameOver = false;

const audioTurn = new Audio("Music/ting.mp3");
const gameover = new Audio("Music/gameover.mp3");

const boxes = document.querySelectorAll(".boxtext");
const line = document.querySelector(".line");
const info = document.querySelector(".info");

const wins = [
    [0, 1, 2, 0, 60, 0],
    [3, 4, 5, 0, 180, 0],
    [6, 7, 8, 0, 300, 0],
    [0, 3, 6, -120, 180, 90],
    [1, 4, 7, 0, 180, 90],
    [2, 5, 8, 120, 180, 90],
    [0, 4, 8, 0, 180, 45],
    [2, 4, 6, 0, 180, 135],
];

function checkWin() {
    wins.forEach(([a, b, c, x, y, angle]) => {
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            info.innerText = `${boxes[a].innerText} Won 🎉`;
            gameOver = true;

            document.querySelector(".imgbox img").style.width = "200px";

            line.style.width = "370px";
            line.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

            gameover.play();
        }
    });
}

document.querySelectorAll(".box").forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!boxes[index].innerText && !gameOver) {
            boxes[index].innerText = turn;
            turn = turn === "X" ? "O" : "X";
            audioTurn.play();
            checkWin();

            if (!gameOver) info.innerText = `Turn for ${turn}`;
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    boxes.forEach((b) => (b.innerText = ""));
    turn = "X";
    gameOver = false;
    info.innerText = "Turn for X";
    line.style.width = "0";
    document.querySelector(".imgbox img").style.width = "0";
});
