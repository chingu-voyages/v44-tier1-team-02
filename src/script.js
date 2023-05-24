
/*VARIABLES*/
let error = document.querySelector(".error-correct-container");
let closeIcon = document.querySelector(".close-correct");

/*ALERT POP UP FUNTION*/
function addAlert(event){
    if(colorCell.length == score + 1){
      error.classList.remove("display");
      }
    }
/*CLOSE ALERT BOX FUNCTION*/
  function closeBox(event){
      let closeGreen = document.querySelector(".error-correct-container");
      closeGreen.classList.add("display");
    }





/*fUNCTIONS*/
  closeIcon.addEventListener("click", closeBox);

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
let score;

/**
 * Function to create grid
 */
function createGrid() {
  for (let numGrid = 1; numGrid <= 2; numGrid++) {
    for (let i = 0; i < output.rows; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < output.cols; j++) {
        const cell = document.createElement("td");
        cell.classList.add("box");
        row.appendChild(cell);
      }
      if (numGrid === 1) {
        grid1.appendChild(row);
      } else {
        grid2.appendChild(row);
      }
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
  num1.textContent = x;
  num2.textContent = y;

  //Round Score
  let roundScore = document.getElementById("round-score");
  score = x * y;
  roundScore.textContent = "Round Score: " + score;
}

/**
 * Function to color cell
 */
function colorCell(event) {
  if (score > 0 && event.target.style.backgroundColor !== "#A4529E") {
    /*#012152*/
    event.target.style.backgroundColor = "#A4529E";
    score--;
  }
}

/**
 * Function to clear cell
 */
function clearCell(event) {
  if (event.target.style.backgroundColor === "#A4529E") {
    event.target.style.backgroundColor = "white";
    score++;
  }
}

//Create grid
document.addEventListener("DOMContentLoaded", function () {
  createGrid();
});

//Add event listener to the dice button
var diceBtn = document.getElementById("dice-btn");
diceBtn.addEventListener("click", rollDice);

//Add event listener to the click on the cell for coloring
grid1.addEventListener("click", colorCell);
grid2.addEventListener("click", colorCell);

//Add an event listener to double click on the cell for clearing the color
grid1.addEventListener("dblclick", clearCell);
grid2.addEventListener("dblclick", clearCell);

