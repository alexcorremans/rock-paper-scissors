String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.slice(1);
}

function game() {
  let round = 1;
  let playerScore = 0;
  let computerScore = 0;
  
  while (round <= 5) {
    let playerSelection = playerSelect();
    if (!playerSelection) {
      gameEnded(playerScore, computerScore);
      return;
    }
    playerSelection = playerSelection.toLowerCase();
    let computerSelection = computerPlay();

    result = playRound(playerSelection, computerSelection);
    if (result == 'win') {
      console.log(winMessage(playerSelection, computerSelection));
      playerScore += 2;
    } else if (result == 'lose') {
      console.log(loseMessage(playerSelection, computerSelection));
      computerScore += 2;
    } else {
      console.log(tieMessage(playerSelection, computerSelection));
      playerScore++;
      computerScore++;
    }
    round++;
  }

  declareWinner(playerScore, computerScore);        
}

function playerSelect() {
  let choice = '';
  while (choice === '') {
    choice = prompt("Please choose 'rock', 'paper' or 'scissors' or press 'Cancel' to end the game:")
  }
  return choice;
}

function computerPlay() {
  const CHOICES = ['rock', 'paper', 'scissors']
  let i = Math.floor(Math.random() * 3);
  return CHOICES[i];
}

function playRound(playerSelection, computerSelection) {
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

function gameEnded(playerScore, computerScore) {
  console.log("You've ended the game.");
  printScores(playerScore, computerScore);
}

function declareWinner(playerScore, computerScore) {
  if (playerScore > computerScore) {
    console.log("You've won the game!");
  } else if (playerScore < computerScore) {
    console.log("You've lost the game!");
  } else {
    console.log("It's a tie!");
  }
  printScores(playerScore, computerScore);
}

function printScores(playerScore, computerScore) {
  console.log(`Your score: ${playerScore} points - Computer score: ${computerScore} points`);
}

game();