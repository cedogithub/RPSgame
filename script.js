// Global variables and buttons for the game
let choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let cpuScore = 0;
let round = 0;
let buttons = document.querySelectorAll(".btn");
let roundResults = document.querySelector(".round-results");
let playerSelection = "";
let scoreBoxYou = document.querySelector(".score-box.you");
let scoreBoxCpu = document.querySelector(".score-box.cpu");
let winnerTextYou = document.querySelector(".winner.you");
let winnerTextCpu = document.querySelector(".winner.cpu");
let rematchButton = document.querySelector(".rematchbtn");
let roundNumber = document.querySelector(".round");
let humanChoiceImg = document.querySelector(".human-choice");
let humanImageSrc = document.querySelector(".human-src");
let cpuImageSrc = document.querySelector(".cpu-src");
let resultsBox = document.querySelector(".results-box");
let choiceContainer = document.querySelector(".player-container");
let instructions = document.querySelector(".instructions");

// Function to display the round results in the main middle box
function displayResults(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  paragraph.classList.add("results-txt");
  roundResults.appendChild(paragraph);
}

// Function to restart the match
function rematch() {
  let rematchBtn = document.createElement("button");
  rematchBtn.textContent = "Rematch?";
  roundResults.appendChild(rematchBtn);
  rematchBtn.classList.add("rematchbtn");
  rematchBtn.addEventListener("click", () => {
    // Resetting the game state
    roundResults.textContent = "";
    scoreBoxCpu.textContent = 0;
    scoreBoxYou.textContent = 0;
    roundNumber.textContent = 0;
    playerScore = 0;
    cpuScore = 0;
    round = 0;
    winnerTextYou.classList.add("hidden");
    winnerTextCpu.classList.add("hidden");
    choiceContainer.classList.remove("hidden");
    instructions.textContent = "Score 5 points to Win the Game!";
    instructions.style.fontFamily = "League Spartan";
    instructions.style.fontSize = "36px";
    instructions.style.color = "white";
  });
}

// Event listener for when the user clicks one of the 3 choices of RPS
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    // Play sound when user clicks
    let clickSound = new Audio('/clickSound.mp3');
    clickSound.play();

    // Set the player's selection based on the clicked button
    switch (e.target.dataset.id) {
      case "rock":
        playerSelection = "rock";
        humanImageSrc.src = "./rock.png";
        break;
      case "paper":
        playerSelection = "paper";
        humanImageSrc.src = "./paper.png";
        break;
      case "scissors":
        playerSelection = "scissors";
        humanImageSrc.src = "./scissors.png";
        break;
    }

    // Start the game
    game();
  });
}

// Function to get a random computer choice for RPS
function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to determine the winner or loser of the game
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    displayResults("It's a tie!");
    return "No winner";
  } else if (playerSelection === "rock" && computerSelection === "paper") {
    displayResults("You lost! Paper beats rock!");
    return "Cpu";
  } else if (playerSelection === "scissors" && computerSelection === "rock") {
    displayResults("You lost! Rock beats scissors!");
    return "Cpu";
  } else if (playerSelection === "paper" && computerSelection === "scissors") {
    displayResults("You lost! Scissors beats paper!");
    return "Cpu";
  } else {
    displayResults("You win! " + playerSelection + " beats " + computerSelection + "!");
    return "You";
  }
}

// Function to update the statistics for each round of the game
function updateStats(winner) {
  if (winner.includes("You")) {
    round++;
    playerScore++;
    scoreBoxYou.textContent = playerScore;
    roundNumber.textContent = round;
  } else if (winner.includes("Cpu")) {
    round++;
    cpuScore++;
    scoreBoxCpu.textContent = cpuScore;
    roundNumber.textContent = round;
  } else if (winner.includes("No winner")) {
    round++;
    roundNumber.textContent = round;
  }
}

// Function to start the game
function game() {
  let computerSelection = getComputerChoice();
  
  // Check if the player's selection is valid
  if (choices.includes(playerSelection)) {
    roundResults.textContent = "";
    let winner = playRound(playerSelection, computerSelection);
    updateStats(winner);
  }

  // Check if the player or CPU has reached the winning score
  if (playerScore === 5) {
    displayResults("The winner of the game is PLAYER!");
    choiceContainer.classList.add("hidden");
    winnerTextYou.classList.remove("hidden");
    instructions.textContent = "GAME OVER";
    instructions.style.fontFamily = "VT323";
    instructions.style.fontSize = "70px";
    instructions.style.color = "#e73c7e";
    rematch();
  }

  // Update the CPU's image based on its selection
  switch (computerSelection) {
    case "rock":
      cpuImageSrc.src = "./rock.png";
      break;
    case "paper":
      cpuImageSrc.src = "./paper.png";
      break;
    case "scissors":
      cpuImageSrc.src = "./scissors.png";
      break;
  }

  // Check if the player or CPU has reached the winning score
  if (cpuScore === 5) {
    displayResults("The winner of the game is the CPU!");
    choiceContainer.classList.add("hidden");
    instructions.style.fontFamily = "VT323";
    instructions.textContent = "GAME OVER";
    instructions.style.fontSize = "70px";
    instructions.style.color = "#e73c7e";
    winnerTextCpu.classList.remove("hidden");
    rematch();
  }
}
