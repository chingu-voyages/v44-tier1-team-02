// Initialize and select variables
let z = [
  "../assets/dice-images/dice1.png" ,
  "../assets/dice-images/dice2.png" ,
  "../assets/dice-images/dice3.png" ,
  "../assets/dice-images/dice4.png" ,
  "../assets/dice-images/dice5.png",
  "../assets/dice-images/dice6.png"
];

// starting conditions
let score = 0;
let startScore = 0;
let currentPlayer = 1;
let updatedScore1=0;
let updatedScore2=0;  
let timer;
let gameActive = false;

const grid1 = document.querySelector(".grid-1");
const grid2 = document.querySelector(".grid-2");
let output = { rows: 10, cols: 10 };
const total = output.rows * output.cols;



// Add event listener to the dice button
var diceBtn1 = document.getElementById("player1-dice");
diceBtn1.addEventListener("click", rollDice);

//player2 dice
var diceBtn2 = document.getElementById("player2-dice");
diceBtn2.addEventListener("click", rollDice);


// Add event listener to the click on the cell for coloring
grid1.addEventListener("click", colorCell);
grid2.addEventListener("click", colorCell);

// Add event listener to the submit button
var submitBtn1 = document.getElementById("submit-btn-1");
submitBtn1.addEventListener("click", submitAnswer);

// Add event listener to the submit button
var submitBtn2 = document.getElementById("submit-btn-2");
submitBtn2.addEventListener("click", submitAnswer);

//pop up section
var popUp = document.querySelector(".pop-up-container");
var close = document.querySelector(".close");
close.addEventListener("click",function(){
  popUp.style.display = "none";
})

// Create grids
document.addEventListener("DOMContentLoaded", function () {
  createGrid(grid1);
  createGrid(grid2);
});

/**
 * Function to create grid
 */
function createGrid(grid) {
  let table = document.createElement("table");

  for (let i = 0; i < output.rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < output.cols; j++) {
      let cell = document.createElement("td");
      cell.classList.add("box");
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  grid.appendChild(table);
}

// player 1 is active by default when page isloaded
grid1.classList.add("grid-active");


// Roll the dice

/**
 * Function to roll the dice
 */
function rollDice() {
  popUp.style.display="flex";
  // Show section
  let diceRollSect = document.querySelector(".diceRollSect");
  diceRollSect.style.display = "block"


  // Generate random numbers for the dice images
  let x = Math.floor(Math.random() * z.length + 1);
  let y = Math.floor(Math.random() * z.length + 1);

  // Set the source attribute of the dice images
  document.querySelector(".img1").setAttribute("src", z[x - 1]);
  document.querySelector(".img2").setAttribute("src", z[y - 1]);

  // Show the number of the displayed dice
  let num1 = document.getElementById("diceValue1");
  let num2 = document.getElementById("diceValue2");

  // Change the text content to a number
  let diceRow = num1.textContent = x;
  let diceCol = num2.textContent = y;
  startScore = score = x * y;

   // Disable dice button for the current player's turn
   if (currentPlayer === 1) {
    diceBtn1.disabled = true; // Disable player 1's dice button
  } else {
    diceBtn2.disabled = true; // Disable player 2's dice button
  }

}

/**
 * Function to color cell
 */
function colorCell(event) {
  
  if (event.target.tagName === "TD" && !event.target.classList.contains("colored")) {
    // Color the cell based on the current player
    if (currentPlayer === 1) {
      event.target.style.backgroundColor = "rgb(164, 82, 158)";
      event.target.classList.add("colored-player1");
    } else {
      event.target.style.backgroundColor = "rgb(72, 157, 202)";
      event.target.classList.add("colored-player2");
    }
  }
}



//Function to handle the answer submission
function submitAnswer() {
  const markedCells = getCurrentPlayerMarkedCells();
  const roundScore = calculateRoundScore();

  const isCorrect = checkAnswer(markedCells, roundScore);

  if (isCorrect) {
    handleCorrectAnswer(roundScore);
  } else {
    handleIncorrectAnswer(markedCells);
  }
}

//function to track cell marked by player
function getCurrentPlayerMarkedCells() {

  let markedCells;
  if (currentPlayer === 1) {
    markedCells = Array.from(document.querySelectorAll(".colored-player1"));
  } else {
    markedCells = Array.from(document.querySelectorAll(".colored-player2"));
  }

  return markedCells;
}

//function to calculate the round score
function calculateRoundScore() {
  const diceRow = parseInt(document.getElementById("diceValue1").textContent);
  const diceCol = parseInt(document.getElementById("diceValue2").textContent);
  return diceRow * diceCol;
}

//Function to check the answer
function checkAnswer(markedCells, roundScore) {

  let markedCount = 0;
  let isCorrect = true;

  for (let i = 0; i < markedCells.length; i++) {
    if (markedCells[i].classList.contains("marked")) {
      continue;
    }

    markedCount++;
    markedCells[i].classList.add("marked");


    if (markedCount > roundScore) {

      isCorrect = false;
      break;
    }
  }


  return isCorrect && markedCount === roundScore;
}

//Function to handle the  correct answer
function handleCorrectAnswer(roundScore) {
  alert("Congratulations! Your answer is correct. You marked " + roundScore + " cells for this round.");
  updatePlayerScore(roundScore);
  disableCurrentPlayerControls();
  switchPlayerTurn();
  enableCurrentPlayerControls();



}

//function to handle the incorrect answer
function handleIncorrectAnswer(roundScore) {
  alert("Sorry, your answer is incorrect. The required number of marked cells for this round is: " + roundScore);

}

//Function to update the player score
function updatePlayerScore(roundScore) {
  if (currentPlayer === 1) {
    player1Score += roundScore;
    document.getElementById("player-1-score").textContent = player1Score;
  } else {
    player2Score += roundScore;
    document.getElementById("player-2-score").textContent = player2Score;
  }
}

//Function to disable control buttons
function disableCurrentPlayerControls() {
  if (currentPlayer === 1) {
    grid1.removeEventListener("click", colorCell);
    submitBtn1.disabled = true;
    diceBtn1.disabled = true;
  } else {
    grid2.removeEventListener("click", colorCell);
    submitBtn2.disabled = true;
    diceBtn2.disabled = true;
  }
}

//Function to Enable game control
function enableCurrentPlayerControls() {
  if (currentPlayer === 1) {
    grid1.addEventListener("click", colorCell);
    submitBtn1.disabled = false;
    diceBtn1.disabled = false;
  } else {
    grid2.addEventListener("click", colorCell);
    submitBtn2.disabled = false;
    diceBtn2.disabled = false;
  }
}


//Function to switch the player turn

function switchPlayerTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}


/**
 * Function to change grid size
 */
// function changeSizeGrid(event) {
//   event.preventDefault();
//   let changeHeight = document.querySelector(".change-grid-height");
//   let changeWidth = document.querySelector(".change-grid-width");
//   let tables = document.querySelectorAll("table");

//   //Delete previous tables
//   tables.forEach((table) => table.remove());

//   //Change the number of columns, rows and cell size
//   output.rows = changeHeight.value;
//   output.cols = changeWidth.value;
//   document.documentElement.style.setProperty(
//     "--size-cell",
//     Math.round(500 / changeWidth.value) + "px"
//   );

  //Create new grids
//   createGrid(grid1);
//   createGrid(grid2);
// }

// function for restart button 
const restart = document.querySelector(".restart");
let playername1 =document.getElementById("player-name1");
let playername2 =document.getElementById("player-name2");

function restartBtn(){

  confirm("Are you sure you would like to start a new game?")
  
  // score = 0;
  // startScore = 0;
  // currentPlayer = 1;
  // updatedScore1=0;
  // updatedScore2=0;  
  // timer;
  console.log(playername1)
    //sets the name input back to an empty value
   if(playername1){
    // playername1.value="pp";
   }
    
     
    // playername2.value=" ";
   
   // // sets the score back to 0
   document.getElementById("player-1-score").textContent = 0;
   document.getElementById("player-2-score").textContent = 0;
   
   // // clears the grid to start a new game
   
   let cell = document.querySelectorAll(".grid td");

   for (let i = 0; i < cell.length; i++){
    cell[i].classList.remove("colored");
    cell[i].setAttribute("painted",false);
   }
  //  cells.forEach((cell)=>{
  //   cell.classList.remove("colored");
  //   cell.setAttribute("painted",false);
  //  })



  //  Updates leaderboard
  
  // // Function to update the win/loss tally
  // function updateTally() {
  //   // Code to update the win/loss tally
  // }
  }

// Add event listener to restart button
restart.addEventListener("click",restartBtn);













  // //////////////////////////////////////////////////////////////

  // const restart = document.querySelector(".restart");
  // let playername1 =document.getElementById("player-name1");
  // let playername2 =document.getElementById("player-name2");
  
// function restartBtn(){

// confirm("Are you sure you would like to start a new game?")

// // score = 0;
// // startScore = 0;
// // currentPlayer = 1;
// // updatedScore1=0;
// // updatedScore2=0;  
// // timer;

//   //sets the name input back to an empty value
//   playername1.value.textContent="ppppp";
//   // playername2.value=" ";
 
//  // // sets the score back to 0
//  document.getElementById("player-1-score").textContent = 0;
//  document.getElementById("player-2-score").textContent = 0;
 
//  // // clears the grid to start a new game


// //  Updates leaderboard

// // // Function to update the win/loss tally
// // function updateTally() {
// //   // Code to update the win/loss tally
// // }

// }

// // // Event listener for restart button
// restart.addEventListener("click",restartBtn);

/////////////////////////////////////////////////////////////////////




// /**
//  * Function to set a non-erasable color for shapes from the previous round
//  */
// function setNonErasableCell() {
//   let cell = document.querySelectorAll(".grid td");
//   for (let i = 0; i < cell.length; i++) {
//     if (cell[i].classList.contains("colored")) {
//       cell[i].setAttribute("painted", true);
//     }
//   }
// }

// /**
//  * Function to clear cell
//  */
// function clearCell(event) {
//   event.preventDefault();
//   if (
//     event.target.classList.contains("colored") &&
//     event.target.getAttribute("painted") !== "true"
//   ) {
//     event.target.classList.remove("colored");
//     score++;
//   }
// }

repaintBtn = document.querySelector(".repaint-btn")

repaintBtn.addEventListener("click",repaintGridAnimation)
//Clear grid for repainting
function repaintGridAnimation() {
  let cells = document.querySelectorAll(".grid td");

  //Remove class with animation
  cells.forEach((cell) => cell.classList.remove("clear-animation"));

  //Add a class with animation and erase the filled cells in the current step
  cells.forEach((cell, i) => {
    setTimeout(() => {
      cell.classList.add("clear-animation");
      if (cell.getAttribute("painted") !== "true") {
        cell.style.backgroundColor = "white";
      }
    }, i * 10);
  })};

// /**
//  * Function to change color
//  */
// function changeColor(event) {
//   document.documentElement.style.setProperty(
//     "--color-cell",
//     event.target.value
//   );
// }

// // Add event listener to the dice button
// var diceBtn = document.getElementById("dice-btn");
// diceBtn.addEventListener("click", rollDice);

// // Add event listener to the click on the cell for coloring
// grid1.addEventListener("click", colorCell);
// grid2.addEventListener("click", colorCell);

// //Add an event listener to right click on the cell for clearing the color
// grid1.addEventListener("contextmenu", clearCell);
// grid2.addEventListener("contextmenu", clearCell);

// //Add an event listener to clear button to repaint grid with current dice roll
// let repaintBtn = document.querySelector(".repaint-btn");
// repaintBtn.addEventListener("click", repaintGridAnimation);

// // Added code from the 'origin/correct-alert' branch
// let error = document.querySelector(".error-correct-container");
// let closeIcon = document.querySelector(".close-correct");

// function addAlert(event) {
//   if (colorCell.length == score + 1) {
//     error.classList.remove("display");
//   }
// }

// function closeBox(event) {
//   let closeGreen = document.querySelector(".error-correct-container");
//   closeGreen.classList.add("display");
// }

// closeIcon.addEventListener("click", closeBox);

// // Add default color
// let selectColor = document.querySelector(".change-color");
// selectColor.value = getComputedStyle(document.documentElement).getPropertyValue(
//   "--color-cell"
// );
// // Add event listener to select a color to draw
// selectColor.addEventListener("input", changeColor);
// selectColor.addEventListener("change", changeColor);




// // updating with new code
//  // Function to start a new game
//  function startNewGame() {
//   // Check if a game is already in progress
//   if (gameInProgress) {
//     // Display a modal alert to confirm abandoning the current game
//     if (confirm("Are you sure you want to start a new game?")) {
//       // Update the leaderboard
//       updateLeaderboard();

//       // Clear the grid
//       clearGrid();

//       // Start a new game
//       startGame();
//     }
//   } else {
//     // Start a new game
//     startGame();
//   }
// }
// }

// // Function to clear the grid
// function clearGrid() {
//   // Code to clear the grid
// }

// // Function to start a new game
// function startGame() {
//   // Reset scores and other game-related variables
//   score = 0;
//   startScore = 0;
//   currentPlayer = 1;
//   player1Score = 0;
//   player2Score = 0;

//   // ...any other initialization code...

//   // Start the game timer if applicable
//   // timer = setInterval(gameTimer, 1000);

//   // Enable the dice roll button
//   document.getElementById("rollDiceBtn").disabled = false;
// }

// // Function to check for errors
// function checkErrors() {
//   // Code to check for errors
// }

// function gameTimer() {
//   // ... timer logic ...
//   // ... check if time is up and end the game ...
//   // ... compare player1Score and player2Score to determine the winner ...
// }

// // Event listener for the grid squares
// const gridSquares = document.getElementsByClassName("grid-square");
// for (let i = 0; i < gridSquares.length; i++) {
//   gridSquares[i].addEventListener("click", markGrid);
// }

// Add event listener to change grid size
// let changeSize = document.querySelector(".submit-change-grid-size");
// changeSize.addEventListener("submit", changeSizeGrid);

