let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".rst-btn");
let newGameBtn = document.querySelector("#nw-btn");
let clearBtn = document.querySelector("#clr-btn");
let msgContainer = document.querySelector(".winnerMsg");
let msg = document.querySelector("#msg");
let player1Input = document.getElementById("pl1");
let player2Input = document.getElementById("pl2");
let player1Name = "Player 1";
let player2Name = "Player 2";
let player1Score = 0;
let player2Score = 0;
let trn1 = Math.random() >= 0.5;

const winningKey = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"]
];

// Function to update player names and scores
const updatePlayerNamesAndScores = () => {
    player1Name = player1Input.value || "Player 1";
    player2Name = player2Input.value || "Player 2";
    document.getElementById("pl1-score").innerText = `${player1Name}: ${player1Score}`;
    document.getElementById("pl2-score").innerText = `${player2Name}: ${player2Score}`;
};

const showWinner = (winner) => {
    if (winner === "X") {
        player1Score++;
    } else {
        player2Score++;
    }
    updatePlayerNamesAndScores();
    msg.innerText = `Congratulations, The winner is ${winner === "X" ? player1Name : player2Name}`;
    msgContainer.classList.remove("none");
    disableBoxes();
};

const showDraw = () => {
    updatePlayerNamesAndScores();
    msg.innerText = `It's a draw!`;
    msgContainer.classList.remove("none");
    disableBoxes();
};

const checkWinner = () => {
    for (let key of winningKey) {
        let pos1Val = boxes[key[0]].innerText;
        let pos2Val = boxes[key[1]].innerText;
        let pos3Val = boxes[key[2]].innerText;
        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
    let isDraw = true;
    boxes.forEach(box => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });
    if (isDraw) {
        showDraw();
    }
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("cl-1", "cl-2");
    });
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const resetGame = () => {
    player1Score = 0; // Reset player 1 score
    player2Score = 0; // Reset player 2 score
    trn1 = Math.random() >= 0.5;
    enableBoxes();
    msgContainer.classList.add("none");
    boxes.forEach(box => {
        box.innerText = "";
    });
    updatePlayerNamesAndScores(); // Update the scores display
};

const clearInputs = () => {
    player1Input.value = "Player 1";
    player2Input.value = "Player 2";
    updatePlayerNamesAndScores();
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
    resetGame();
    clearInputs();
});
clearBtn.addEventListener("click", clearInputs);

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (trn1) {
                box.innerText = "X";
                box.classList.add("cl-1");
            } else {
                box.innerText = "O";
                box.classList.add("cl-2");
            }
            trn1 = !trn1;
            checkWinner();
        }
    });
});

// Update player names and scores when the page loads
updatePlayerNamesAndScores();

// Update player names when input values change
player1Input.addEventListener("input", updatePlayerNamesAndScores);
player2Input.addEventListener("input", updatePlayerNamesAndScores);
