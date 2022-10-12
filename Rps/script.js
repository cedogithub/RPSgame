//global variables for the game
let choice = ["rock", "paper", "scissor"];
let playerScore = 0;
let cpuScore = 0;
let round = 0;
let button = document.querySelectorAll("button");
let divResults = document.querySelector(".round-results");
let playerSelection ='';


//displaying the rounds results in the html
function para(test){
  const p = document.createElement("p");
  p.textContent = test;
  divResults.appendChild(p);
}
function rematch(){
  let rematchBtn = document.createElement("button");
  rematchBtn.textContent = "rematch";
  divResults.appendChild(rematchBtn);
  rematchBtn.addEventListener("click", () =>{
    divResults.innerHTML = "";
    playerScore = 0;
    cpuScore = 0;
    round =0;
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = false;
    }
  })
  
}

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", (e) => {
    switch (e.target.dataset.id) {
      case "rock": 
      playerSelection = "rock"
      break;
      case "paper": 
      playerSelection = "paper"
      break;
      case "scissor": 
      playerSelection = "scissor"

    }
    
    game();
  })
}

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
    para("its a tie!");
    return "No winner";
  } else if (playerSelection === "rock" && computerSelection === "paper") {
    para("You lost! paper beats rock!");
    return "Cpu";
  } else if (playerSelection === "scissor" && computerSelection === "rock") {
    para("You lost ! rocks beats scissor!");
    return "Cpu";
  } else if (playerSelection === "paper" && computerSelection === "scissor") {
    para("You lost ! scissor beats paper!");
    return "Cpu";
  } else {
    para("You win " + playerSelection + " beats " + computerSelection);
    return "Player";
  }
}
//stats for every round of the game
function statsRound(user) {
  let theWinner = "";
  if (user.includes("Player")) {
    round++;
    playerScore++;
    para("Round " + round + " winner is: " + user);
    para("Player Score: " + playerScore)
    para("Cpu Score: " + cpuScore);
  } else if (user.includes("Cpu")) {
    round++;
    cpuScore++;
    para("Round " + round + " winner is " + user);
    para("Cpu Score: " + cpuScore);
    para("Player Score: " + playerScore)
  } else if (user.includes("No winner")) {
    round++;
    para("Round " + round);
    para("Player Score: " + playerScore)
    para("Cpu Score: " + cpuScore);
  }
}


//Starts the game 
function game() {
    let computerSelection = getComputerChoice();

    if (
      playerSelection === "scissor" ||
      playerSelection === "rock" ||
      playerSelection === "paper"
    ) {      
      divResults.innerHTML =''
      let winner = playRound(playerSelection, computerSelection);
      statsRound(winner);
    }
  if (playerScore ==5) {
    para("The winner of the game is you!");
    
for (let i = 0; i < button.length; i++) {
  button[i].disabled = true;
}
rematch();
}


  if (cpuScore == 5) {
    para("The winner of the game is the cpu!");
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = true;

    }
    rematch();
  }
}

