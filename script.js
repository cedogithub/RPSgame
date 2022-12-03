//global variables for the game
let choice = ["rock", "paper", "scissor"];
let playerScore = 0;
let cpuScore = 0;
let round = 0;
let button = document.querySelectorAll("button");
let divResults = document.querySelector(".round-results");
let playerSelection ='';
let scoreBoxYou = document.querySelector('.score-box.you')
let scoreBoxCpu = document.querySelector('.score-box.cpu')
let winTextYou = document.querySelector('.winner.you')
let winTextCpu = document.querySelector('.winner.cpu')
let rematch1 = document.querySelector('.rematchbtn')
let currentRound = document.querySelector('.current-round')
let humanChoiceImg = document.querySelector('.human-choice')
let cpuChoiceImg = document.querySelector('.cpu-choice')
let resultsBox = document.querySelector('.results-box')
console.log(rematch);

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
  rematchBtn.classList.add('rematchbtn')
  rematchBtn.addEventListener("click", () =>{
    divResults.innerHTML = "";
    scoreBoxCpu.innerHTML = 0
    scoreBoxYou.innerHTML =0
    playerScore = 0;
    cpuScore = 0;
    round = 0;
    winTextYou.classList.add("hidden");
    winTextCpu.classList.add("hidden");

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
      humanChoiceImg.textContent ="✊"
      break;
      case "paper": 
      playerSelection = "paper"
      humanChoiceImg.textContent ="🤚"

      break;
      case "scissor": 
      playerSelection = "scissor"
      humanChoiceImg.textContent ="✌️"

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
    para("You win! " + playerSelection + " beats " + computerSelection+"!");
    return "Player";
  }
}
//stats for every round of the game
function statsRound(user) {
  if (user.includes("Player")) {
    round++;
    playerScore++;
    scoreBoxYou.textContent = playerScore
    currentRound.textContent = `Round ${round}`
    para(" winner is: " + user);

  } else if (user.includes("Cpu")) {
    round++;
    cpuScore++;
    scoreBoxCpu.textContent = cpuScore
    currentRound.textContent = `Round ${round}`


    para( " winner is " + user);
  } else if (user.includes("No winner")) {
    round++;
    currentRound.textContent = `Round ${round}`
   
  }
}


//Starts the game 
function game() {
    let computerSelection = getComputerChoice();
    console.log(computerSelection);

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
winTextYou.classList.remove("hidden");
rematch();
}

switch (computerSelection) {
  case "rock": 
  cpuChoiceImg.textContent ="✊"
  break;
  case "paper": 
  cpuChoiceImg.textContent ="🤚"
  break;
  case "scissor": 
  cpuChoiceImg.textContent ="✌️"
}
  if (cpuScore == 5) {
    para("The winner of the game is the cpu!");
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = true;

    }
    winTextCpu.classList.remove("hidden");

    rematch();
  }
}

