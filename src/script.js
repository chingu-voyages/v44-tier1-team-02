let z = [
  "assets/dice-images/dice1.png",
  "assets/dice-images/dice2.png",
  "assets/dice-images/dice3.png",
  "assets/dice-images/dice4.png",
  "assets/dice-images/dice5.png",
  "assets/dice-images/dice6.png",
];

const grid1 = document.querySelector(".grid");
const grid2 = document.querySelector(".grid-2");
const output = { rows: 10, cols: 10 };
const total = output.rows * output.cols;

let score, startScore;


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

/**
 * Function to set a non-erasable color for shapes from the previous round
 */
function setNonErasableCell() {
  let cell = document.querySelectorAll(".grid td");
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].classList.contains("colored")) {
      cell[i].setAttribute("painted", true);
    }
  }
}

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

  // Show the Number of the displayed Dice
  let num1 = document.getElementById("diceValue1");
  let num2 = document.getElementById("diceValue2");

  // Change the text content to a number
  num1.textContent = x;
  num2.textContent = y;

  // Round Score
  let roundScore = document.getElementById("round-score");
  startScore = score = x * y;
  roundScore.textContent = "Round Score: " + score;

  // Set a non-erasable color
  setNonErasableCell();
}

/**
 * Function to color cell
 */
function colorCell(event) {
  if (
    event.target.tagName === "TD" &&
    score > 0 &&
    !event.target.classList.contains("colored")
  ) {
    // Painted cell
    event.target.classList.add("colored");
    score--;
  }
}

/**
 * Function to clear cell
 */
function clearCell(event) {
  event.preventDefault();
  if (
    event.target.classList.contains("colored") &&
    event.target.getAttribute("painted") !== "true"
  ) {
    event.target.classList.remove("colored");
    score++;
  }
}


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
  });

  //Set initial score
  score = startScore;
}

//Create grid

/**
 * Function to change color
 */
function changeColor(event) {
  document.documentElement.style.setProperty(
    "--color-cell",
    event.target.value
  );
}

// Create grid

document.addEventListener("DOMContentLoaded", function () {
  createGrid(grid1);
  createGrid(grid2);
});

// Add event listener to the dice button
var diceBtn = document.getElementById("dice-btn");
diceBtn.addEventListener("click", rollDice);

// Add event listener to the click on the cell for coloring
grid1.addEventListener("click", colorCell);
grid2.addEventListener("click", colorCell);


//Add an event listener to right click on the cell for clearing the color
grid1.addEventListener("contextmenu", clearCell);
grid2.addEventListener("contextmenu", clearCell);

//Add an event listener to clear button to repaint grid with current dice roll
let repaintBtn = document.querySelector(".repaint-btn");
repaintBtn.addEventListener("click", repaintGridAnimation);

// Add an event listener to double click on the cell for clearing the color
grid1.addEventListener("contextmenu", clearCell);
grid2.addEventListener("contextmenu", clearCell);

// Added code from the 'origin/correct-alert' branch
let error = document.querySelector(".error-correct-container");
let closeIcon = document.querySelector(".close-correct");

function addAlert(event) {
  if (colorCell.length == score + 1) {
    error.classList.remove("display");
  }
}

function closeBox(event) {
  let closeGreen = document.querySelector(".error-correct-container");
  closeGreen.classList.add("display");
}

closeIcon.addEventListener("click", closeBox);

// Add default color
let selectColor = document.querySelector(".change-color");
selectColor.value = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-cell"
);
// Add event listener to select a color to draw
selectColor.addEventListener("input", changeColor);
selectColor.addEventListener("change", changeColor);

