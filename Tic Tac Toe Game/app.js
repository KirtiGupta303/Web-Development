let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;
    enableboxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        if (turnO) {
            box.innerText = "O";
            box.classList.add("O");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("X");
            turnO = true;
        }

        box.disabled = true;
        count++;

        const winnerFound = checkWinner();
        if (!winnerFound && count === 9) {
            gameOver = true;
            msg.innerText = "It's a draw!";
            msgcontainer.classList.remove("hide");
        }
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("X","O");
    }
};

const showWinner = (winner) => {
    gameOver = true;
    msg.innerText = `Congratulations, Winner is Player ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", () => {
    if (!gameOver) {
        resetGame();
    }
});
