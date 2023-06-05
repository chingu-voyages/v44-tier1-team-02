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
let score, startScore, diceRow, diceCol;
let squareCell = [];

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
    if (cell[i].style.backgroundColor === "rgb(164, 82, 158)") {
      cell[i].setAttribute("painted", true);
    }
  }
}

/**
 * Function to roll the dice
 */
function rollDice() {
  //Show section
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
  diceRow = num1.textContent = x;
  diceCol = num2.textContent = y;

  //Round Score
  let roundScore = document.getElementById("round-score");
  startScore = score = x * y;
  roundScore.textContent = "Round Score: " + score;

  //Set a non-erasable color
  setNonErasableCell();
}

/**
 * Function to color cell
 */
function colorCell(event) {
  if (
    event.target.tagName.toLowerCase() === "td" &&
    score > 0 &&
    event.target.style.backgroundColor !== "rgb(164, 82, 158)"
  ) {
    //Set the row and column of the selected cell
    let activeCellRow = event.target.parentNode.rowIndex;
    let activeCellCol = event.target.cellIndex;
    let index;

    //First cell
    if (score === startScore) {
      //Set row and column to draw
      let activeRow = event.target.parentNode.rowIndex;
      let activeCol = event.target.cellIndex;

      //Clear array
      squareCell.length = 0;

      //Check if an array fits the grid
      if (output.cols - activeCellCol < diceCol)
        diceCol === output.cols - activeCellCol;
      if (output.rows - activeCellRow < diceRow)
        diceRow === output.rows - activeCellRow;

      //Save the first square
      for (let x = 0; x < diceRow; x++) {
        for (let y = 0; y < diceCol; y++) {
          index = (activeRow + x) * 10 + (activeCol + y);

          squareCell.push(index);
        }
      }

      //Save the second square
      for (let x = 0; x < diceCol; x++) {
        for (let y = 0; y < diceRow; y++) {
          index = (activeRow + x) * 10 + (activeCol + y);
          squareCell.push(index);
        }
      }

      //Painted cell
      event.target.style.backgroundColor = "rgb(164, 82, 158)";
      score--;

      //Clicked the next cell
    } else {
      //Calculate index
      let index = activeCellRow * output.cols + activeCellCol;

      //Check if a cell fits in a square
      if (squareCell.includes(index)) {
        //Painted cell
        event.target.style.backgroundColor = "rgb(164, 82, 158)";
        score--;
      }
    }
  }
}

/**
 * Function to clear cell
 */
function clearCell(event) {
  event.preventDefault();
  if (
    event.target.style.backgroundColor === "rgb(164, 82, 158)" &&
    event.target.getAttribute("painted") !== "true"
  ) {
    event.target.style.backgroundColor = "white";
    score++;
  }
}

//Create grid
document.addEventListener("DOMContentLoaded", function () {
  createGrid(grid1);
  createGrid(grid2);
});

//Add event listener to the dice button
var diceBtn = document.getElementById("dice-btn");
diceBtn.addEventListener("click", rollDice);

//Add event listener to the click on the cell for coloring
grid1.addEventListener("click", colorCell);
grid2.addEventListener("click", colorCell);

//Add an event listener to right click on the cell for clearing the color
grid1.addEventListener("contextmenu", clearCell);
grid2.addEventListener("contextmenu", clearCell);
