// Initialize and select variables
let z = [
  "assets/dice-images/dice1.png",
  "assets/dice-images/dice2.png",
  "assets/dice-images/dice3.png",
  "assets/dice-images/dice4.png",
  "assets/dice-images/dice5.png",
  "assets/dice-images/dice6.png",
];

let score = 0;
let startScore = 0;
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let timer;

const grid1 = document.querySelector(".grid-1");
const grid2 = document.querySelector(".grid-2");
let output = { rows: 10, cols: 10 };
const total = output.rows * output.cols;

// Event Listeners
// Add event listener to the dice button
var diceBtn = document.getElementById("dice-btn");
diceBtn.addEventListener("click", rollDice);


// Add event listener to the click on the cell for coloring
grid1.addEventListener("click", colorCell);
grid2.addEventListener("click", colorCell);

// Add event listener to the submit button
var submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", submitAnswer);

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
      const cell = document.createElement("td");
      cell.classList.add("box");
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  grid.appendChild(table);
}

// Roll the dice

/**
 * Function to roll the dice
 */
function rollDice() {
  // Show section
  let diceRollSect = document.querySelector(".diceRollSect");
  diceRollSect.style.visibility = "visible";

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

  // Calculate the round score
  let roundScore = document.getElementById("round-score");
  startScore = score = x * y;
  roundScore.textContent = "Round Score: " + score;

  // Disable the dice roll button until the current player submits their answer
  document.getElementById("dice-btn").disabled = true;
  document.getElementById("submit-btn").disabled = false;
}

// Color the grid cells
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





/**
 * Function to submit the answer
 */
function submitAnswer() {
  let markedCells;
  if (currentPlayer === 1) {
    markedCells = Array.from(document.querySelectorAll(".colored-player1"));
  } else {
    markedCells = Array.from(document.querySelectorAll(".colored-player2"));
  }
  let diceRow = parseInt(document.getElementById("diceValue1").textContent);
  let diceCol = parseInt(document.getElementById("diceValue2").textContent);
  let roundScore = diceRow * diceCol; // Calculate the round score

  let markedCount = 0;
  let isCorrect = true;

  // Check if the marked cells match the current round score
  for (let i = 0; i < markedCells.length; i++) {
    if (markedCells[i].classList.contains("marked")) {
      continue; // Skip already marked cells from previous rounds
    }

    markedCount++;
    markedCells[i].classList.add("marked");


    if (markedCount > roundScore) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect && markedCount === roundScore) {
    alert("Congratulations! Your answer is correct. You marked " + roundScore + " cells for this round.");
    if (currentPlayer === 1) {
      player1Score += roundScore;
      document.getElementById("player-1-score").textContent = "Player 1 Score: " + player1Score;
    } else {
      player2Score += roundScore;
      document.getElementById("player-2-score").textContent = "Player 2 Score: " + player2Score;
    }
    switchPlayerTurn();
  } else {
    alert("Sorry, your answer is incorrect. The required number of marked cells for this round is: " + roundScore);


    if (currentPlayer === 1) {
      grid1.addEventListener("click", colorCell);
    } else {
      grid2.addEventListener("click", colorCell);
    }
  }
}


function switchPlayerTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("dice-btn").disabled = false;
  document.getElementById("submit-btn").disabled = true;
}


/**
 * Function to change grid size
 */
function changeSizeGrid(event) {
  event.preventDefault();
  let changeHeight = document.querySelector(".change-grid-height");
  let changeWidth = document.querySelector(".change-grid-width");
  let tables = document.querySelectorAll("table");

  //Delete previous tables
  tables.forEach((table) => table.remove());

  //Change the number of columns, rows and cell size
  output.rows = changeHeight.value;
  output.cols = changeWidth.value;
  document.documentElement.style.setProperty(
    "--size-cell",
    Math.round(500 / changeWidth.value) + "px"
  );

  //Create new grids
  createGrid(grid1);
  createGrid(grid2);
}








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


// //Clear grid for repainting
// function repaintGridAnimation() {
//   let cells = document.querySelectorAll(".grid td");

//   //Remove class with animation
//   cells.forEach((cell) => cell.classList.remove("clear-animation"));

//   //Add a class with animation and erase the filled cells in the current step
//   cells.forEach((cell, i) => {
//     setTimeout(() => {
//       cell.classList.add("clear-animation");
//       if (cell.getAttribute("painted") !== "true") {
//         cell.style.backgroundColor = "white";
//       }
//     }, i * 10);
//   });

//   //Set initial score
//   score = startScore;
// }

// /**
//  * Function to change color
//  */
// function changeColor(event) {
//   document.documentElement.style.setProperty(
//     "--color-cell",
//     event.target.value
//   );
// }



// User can see a button in the game control pane
// to start a new game, which
// updates the Leaderboard, clears the grid, and starts a new game.


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

// // Add an event listener to double click on the cell for clearing the color
// grid1.addEventListener("contextmenu", clearCell);
// grid2.addEventListener("contextmenu", clearCell);


// // Event listener for restart button
// document.querySelector(".restart").addEventListener("click",function(){

//   // sets the name input back to an empty value
//   document.querySelector(".name-player-edit1").value="";
//   document.querySelector(".name-player-edit2").value="";

// // sets the score back to 0

//   document.querySelector(".name-player-score1").textContent="Score : "+initialScore
//   document.querySelector(".name-player-score2").textContent="Score : "+initialScore

// // clears the grid

//     document.querySelector(".grid1").style.backgroundColor = "white";
//     document.querySelector(".grid2").style.backgroundColor = "white";
//     // score++;

// })



// // updates the leaderboard
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

// // Function to update the leaderboard
// function updateLeaderboard() {
//   // Code to update the leaderboard
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
=======

// document.querySelector(".check").addEventListener("click",function(){
// if(score===roundScore){
//   updatedScore++
// }
// })

// Event listener for restart button
document.querySelector(".restart").addEventListener("click", function () {
  // sets the name input back to an empty value
  document.querySelector(".name-player-edit1").value = "";
  document.querySelector(".name-player-edit2").value = "";

  // sets the score back to 0

  document.querySelector(".name-player-score1").textContent =
    "Score : " + initialScore;
  document.querySelector(".name-player-score2").textContent =
    "Score : " + initialScore;


  // clears the grid

  document.querySelector(".grid1").style.backgroundColor = "white";
  document.querySelector(".grid2").style.backgroundColor = "white";
  // score++;
});


// // Function to check for errors
// function checkErrors() {
//   // Code to check for errors
// }

// // Function to update the win/loss tally
// function updateTally() {
//   // Code to update the win/loss tally
// }

// function gameTimer() {
//   // ... timer logic ...
//   // ... check if time is up and end the game ...
//   // ... compare player1Score and player2Score to determine the winner ...
// }

// // Event listener for the "Start New Game" button
// const startBtn = document.getElementById("start-btn");
// startBtn.addEventListener("click", startNewGame);


// // Event listener for the "Roll Dice" button
// const rollBtn = document.getElementById("roll-btn");
// rollBtn.addEventListener("click", rollDice);

// // Event listener for the grid squares
// const gridSquares = document.getElementsByClassName("grid-square");
// for (let i = 0; i < gridSquares.length; i++) {
//   gridSquares[i].addEventListener("click", markGrid);
// }

// Add event listener to change grid size
let changeSize = document.querySelector(".submit-change-grid-size");
changeSize.addEventListener("submit", changeSizeGrid);

