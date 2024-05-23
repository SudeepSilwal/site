let uName = prompt("What is your Name");
console.log(uName)
let userScore = 0;

let compScore = 0;

const options = document.querySelectorAll(".option");
const msg = document.querySelector("#mov")
const userCount = document.querySelector("#uNum")
const compCount = document.querySelector("#cNum")

const genCompChoice= () => {
    const choices = ["scissor", "paper", "rock"];
    const ranNum = Math.floor(Math.random()*3)
    return choices[ranNum];
}

const showWinner = (userWin) => {
    if (userWin === true) {
        console.log("You Win");
        userScore++;
        userCount.innerText = userScore;
        msg.innerText = `${uName} Won`; 
        msg.style.backgroundColor = "lightgreen"; // Green for user win
    } else {
        compScore++;
        compCount.innerText = compScore;
        console.log("You Lose");
        msg.innerText = "Computer Won";
        msg.style.backgroundColor = "red"; // Red for user loss
    }
};


const draw = () =>{
    console.log("Drawwwwwwwwww")
    msg.innerText = "Draw. Play Again";
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice()
    console.log("user picked = " ,userChoice, " & Computer picked = " ,compChoice);
    if (userChoice === compChoice){
        //Draw
        draw();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper") {
            userWin =  compChoice === "scissor" ? false : true;
        }
        else{
            userWin =  compChoice === "rock" ? false : true;
        }
        showWinner(userWin)
    }


}

options.forEach((option) => {
    option.addEventListener("click", () => {
        const userChoice = option.getAttribute("id");
        console.log("The choice was clicked!",userChoice);
        playGame(userChoice)
    });
});
