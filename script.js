//global variables and buttons for the game
let choice = ["rock", "paper", "scissor"];
let playerScore = 0;
let cpuScore = 0;
let round = 0;
let button = document.querySelectorAll(".btn");
let divResults = document.querySelector(".round-results");
let playerSelection = "";
let scoreBoxYou = document.querySelector(".score-box.you");
let scoreBoxCpu = document.querySelector(".score-box.cpu");
let winTextYou = document.querySelector(".winner.you");
let winTextCpu = document.querySelector(".winner.cpu");
let rematch1 = document.querySelector(".rematchbtn");
let roundNumber = document.querySelector(".round");
let humanChoiceImg = document.querySelector(".human-choice");
let humanSrc = document.querySelector(".human-src");
let cpuSrc = document.querySelector(".cpu-src");
let resultsBox = document.querySelector(".results-box");
let choiceContainer = document.querySelector(".player-container");
let instructions = document.querySelector(".instructions");

//displaying the rounds results in the html
function para(test) {
  const p = document.createElement("p");
  p.textContent = test;
  p.classList.add("results-txt");
  divResults.appendChild(p);
}
function rematch() {
  let rematchBtn = document.createElement("button");
  rematchBtn.textContent = "Rematch?";
  divResults.appendChild(rematchBtn);
  rematchBtn.classList.add("rematchbtn");
  rematchBtn.addEventListener("click", () => {
    divResults.innerHTML = "";
    scoreBoxCpu.innerHTML = 0;
    scoreBoxYou.innerHTML = 0;
    roundNumber.textContent = 0;
    playerScore = 0;
    cpuScore = 0;
    round = 0;
    winTextYou.classList.add("hidden");
    winTextCpu.classList.add("hidden");
    choiceContainer.classList.remove("hidden");
    instructions.textContent = "Score 5 points to Win the Game!";
    instructions.style.fontFamily = "League Spartan";
    instructions.style.fontSize = "36px";
    instructions.style.color = "white";
  });
}
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", (e) => {
    switch (e.target.dataset.id) {
      case "rock":
        playerSelection = "rock";
        humanSrc.src = "./rock.png";

        break;
      case "paper":
        playerSelection = "paper";
        humanSrc.src = "./paper.png";

        break;
      case "scissor":
        playerSelection = "scissor";
        humanSrc.src = "./scissors.png";
    }

    game();
  });
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
    para("You win! " + playerSelection + " beats " + computerSelection + "!");
    return "You";
  }
}

//stats for every round of the game
function statsRound(user) {
  if (user.includes("You")) {
    round++;
    playerScore++;
    scoreBoxYou.textContent = playerScore;
    roundNumber.textContent = round;
  } else if (user.includes("Cpu")) {
    round++;
    cpuScore++;
    scoreBoxCpu.textContent = cpuScore;
    roundNumber.textContent = round;
  } else if (user.includes("No winner")) {
    round++;
    roundNumber.textContent = round;
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
    divResults.innerHTML = "";
    let winner = playRound(playerSelection, computerSelection);
    statsRound(winner);
  }
  if (playerScore == 5) {
    para("The winner of the game is PLAYER!");
    choiceContainer.classList.add("hidden");
    winTextYou.classList.remove("hidden");
    instructions.textContent = "GAME OVER";
    instructions.style.fontFamily = "VT323", "sans-serif";
    instructions.style.fontSize = "70px";
    instructions.style.color = "#e73c7e";

    rematch();
  }

  switch (computerSelection) {
    case "rock":
      cpuSrc.src = "./rock.png";
      break;
    case "paper":
      cpuSrc.src = "./paper.png";
      break;
    case "scissor":
      cpuSrc.src = "./scissors.png";
  }
  if (cpuScore == 5) {
    para("The winner of the game is the CPU!");
    choiceContainer.classList.add("hidden");
    instructions.style.fontFamily = "VT323", "sans-serif";
    console.log(instructions.style.fontFamily, "ll");
    instructions.textContent = "GAME OVER";
    instructions.style.fontSize = "70px";
    instructions.style.color = "#e73c7e";
    winTextCpu.classList.remove("hidden");

    rematch();
  }
}
