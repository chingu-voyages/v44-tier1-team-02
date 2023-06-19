// Initialize and select variables
let z = [
  "../assets/dice-images/dice1.png" ,
  "../assets/dice-images/dice2.png" ,
  "../assets/dice-images/dice3.png" ,
  "../assets/dice-images/dice4.png" ,
  "../assets/dice-images/dice5.png",
  "../assets/dice-images/dice6.png"
];

let score = 0;
let startScore = 0;
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
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


/**
 * Function to submit the answer
 */
// function submitAnswer() {
//   let coloredCells;

//   if (currentPlayer === 1) {
//     coloredCells = [];
//     const cells = document.querySelectorAll(".colored-player1");
//     for (let i = 0; i < cells.length; i++) {
//       coloredCells.push(cells[i]);
//     }
//   } else {
//     coloredCells = [];
//     const cells = document.querySelectorAll(".colored-player2");
//     for (let i = 0; i < cells.length; i++) {
//       coloredCells.push(cells[i]);
//     }
//   }

//   let diceRow = parseInt(document.getElementById("diceValue1").textContent);
//   let diceCol = parseInt(document.getElementById("diceValue2").textContent);
//   let roundScore = diceRow * diceCol; // Calculate the round score

//   let markedCount = 0;
//   let isCorrect = true;

//   // Check if the marked cells match the current round score
//   for (let i = 0; i < coloredCells.length; i++) {
//     if (coloredCells[i].classList.contains("marked")) {
//       continue; // Skip already marked cells from previous rounds
//     }

//     markedCount++;
//     coloredCells[i].classList.add("marked");

//     if (markedCount > roundScore) {
//       isCorrect = false;
//       break;
//


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
function handleIncorrectAnswer(markedCells) {
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



