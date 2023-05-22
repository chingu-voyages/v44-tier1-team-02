let z = [
  "assets/dice-images/dice1.png",
  "assets/dice-images/dice2.png",
  "assets/dice-images/dice3.png",
  "assets/dice-images/dice4.png",
  "assets/dice-images/dice5.png",
  "assets/dice-images/dice6.png",
];

const secondGrid = document.querySelector(".grid");
const output = { rows: 10, cols: 10 };
const total = output.rows * output.cols;
const COL = 2;
const ROW = 3;
let dice = COL * ROW;

/**
 * Function to create grid
 */
function createGrid() {
  for (let i = 0; i < output.rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < output.cols; j++) {
      const cell = document.createElement("td");
      cell.classList.add("box");
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

/**
 * Function to roll the dice
 */
function rollDice() {
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

  //Round Score
  let roundScore = document.getElementById("round-score");
  let score = x * y;
  roundScore.textContent = "Round Score: " + score;
}

/**
 * Function to color cell
 */
function colorCell(event) {
  if (dice > 0 && event.target.style.backgroundColor !== "red") {
    event.target.style.backgroundColor = "red";
    dice--;
  }
}

/**
 * Function to clear cell
 */
function clearCell(event) {
  if (event.target.style.backgroundColor === "red") {
    event.target.style.backgroundColor = "white";
    dice++;
  }
}

//Create grid
document.addEventListener("DOMContentLoaded", function () {
  createGrid();
});

//Add event listener to the dice button
var diceBtn = document.getElementById("dice-btn");
diceBtn.addEventListener("click", rollDice);

let grid = document.querySelector(".grid");
//Add event listener to the click on the cell for coloring
grid.addEventListener("click", colorCell);
//Add an event listener to double click on the cell for clearing the color
grid.addEventListener("dblclick", clearCell);
