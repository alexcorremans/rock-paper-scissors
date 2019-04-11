String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.slice(1);
}

function playRound(e) {
  round++;
  printHeading(`Round ${round}`);
  
  const playerSelection = e.target.id;
  const computerSelection = computerPlay();
  
  result = compareSelections(playerSelection, computerSelection);
  if (result == 'win') {
    printMessage(winMessage(playerSelection, computerSelection));
    playerScore += 2;
  } else if (result == 'lose') {
    printMessage(loseMessage(playerSelection, computerSelection));
    computerScore += 2;
  } else {
    printMessage(tieMessage(playerSelection, computerSelection));
    playerScore++;
    computerScore++;
  }
  
  if (round == 5) {
    endGame(playerScore, computerScore);
  } else {
    printScores(playerScore, computerScore);
  }     
}

function computerPlay() {
  const CHOICES = ['rock', 'paper', 'scissors']
  const i = Math.floor(Math.random() * 3);
  return CHOICES[i];
}

function compareSelections(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    return 'tie';
  } else if (
    playerSelection == 'rock' && computerSelection == 'paper' || 
    playerSelection == 'paper' && computerSelection == 'scissors' ||
    playerSelection == 'scissors' && computerSelection == 'rock') {
    return 'lose';
  } else {
    return 'win';
  }
}

function winMessage(playerSelection, computerSelection) {
  return `You win! ${playerSelection.capitalize()} beats ${computerSelection.capitalize()}`;
}

function loseMessage(playerSelection, computerSelection) {
  return `You lose! ${computerSelection.capitalize()} beats ${playerSelection.capitalize()}`;
}

function tieMessage(playerSelection) {
  return `It's a tie! You both picked ${playerSelection.capitalize()}`;
}

function endGame(playerScore, computerScore) {
  declareWinner(playerScore, computerScore);
  disableButtons();
  showResetButton();
}

function declareWinner(playerScore, computerScore) {
  if (playerScore > computerScore) {
    printHeading("You've won the game!");
  } else if (playerScore < computerScore) {
    printHeading("You've lost the game!");
  } else {
    printHeading("It's a tie!");
  }
  printScores(playerScore, computerScore);
}

function printScores(playerScore, computerScore) {
  printMessage(`Your score: ${playerScore} points - Computer score: ${computerScore} points`);
}

function printMessage(message) {
  const display = document.querySelector('#display');
  const p = document.createElement('p');
  p.textContent = message;
  display.appendChild(p);
}

function printHeading(heading) {
  const display = document.querySelector('#display');
  const h2 = document.createElement('h2');
  h2.textContent = heading;
  display.appendChild(h2);
}

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function enableButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function showResetButton() {
  const reset = document.querySelector('#reset');
  const resetbtn = document.createElement('button');
  resetbtn.textContent = "Play Again!"
  resetbtn.addEventListener('click', resetGame);
  reset.appendChild(resetbtn);
}

function hideResetButton() {
  reset.removeChild(reset.firstChild);
}

function resetGame() {
  round = 0;
  playerScore = 0;
  computerScore = 0;

  hideMessages();
  enableButtons();
  hideResetButton();
}

function hideMessages() {
  const display = document.querySelector('#display');
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
}

let round = 0;
let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', playRound);
});

