//global variables for the game 
let choice = ["rock", "paper", "scissor"];
let playerScore = 0;
let cpuScore = 0;
let round = 0

//computer choice of rps
function getComputerChoice() {
  let randomChoice = [Math.floor(Math.random() * choice.length)];
  return choice[randomChoice];
}

// logic to determine the winner or loser of the game
    function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let round = 0;
    if (playerSelection === computerSelection) {
        console.log("its a tie!");
        return "No winner"

    } else if (playerSelection === "rock" && computerSelection === "paper") {
        console.log( "You lost! paper beats rock!");
        return "Cpu"

    } else if (playerSelection === "scissor" && computerSelection === "rock") {
        console.log( "You lost ! rocks beats scissor!");
        return "Cpu"

    } else if (playerSelection === "paper" && computerSelection === "scissor") {
        console.log("You lost ! scissor beats paper!");
        return "Cpu"

    } else {
        console.log("You win "+ playerSelection + " beats " + computerSelection);
        return "Player"
    }
    }

//Starts the game with 5 rounds and announces winner at the end of the game
    function game() {
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt(
        "Choose Rock , Paper or scissor"
        ).toLowerCase();
        let computerSelection = getComputerChoice();

        if (playerSelection === "scissor" || playerSelection  === "rock"  || playerSelection === "paper") {
            let winner = (playRound(playerSelection, computerSelection));
            statsRound(winner);
        }
        
    }
    if(playerScore>cpuScore){
        console.log('The winner of the game is you!')
    }
    if(cpuScore > playerScore ){
        console.log('The winner of the game is the cpu!')
    }
    }

    //stats for every round of the game
    function statsRound(user){
        let theWinner ='';
        if(user.includes("Player")){
            round++;
            playerScore++;
            console.log("Round " + round)
            console.log("Player Score:" + playerScore + " Cpu Score:" + cpuScore );
        }
        else if(user.includes("Cpu")){
            round++;
            cpuScore++;
            console.log("Round " + round)
            console.log("Cpu Score:" + cpuScore + " Player Score:" + playerScore);
        }
        else if(user.includes("No winner")){
            round++;
            console.log("Round " + round)
        }

    }

console.log(game());
