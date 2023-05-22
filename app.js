function createGrid() {
  let grid = document.createElement("div");
  grid.classList.add("grid");

  for (let i = 1; i < 101; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerHTML = `${i}`;

    grid.appendChild(cell);
  }

  let main = document.querySelector(".main");
  main.appendChild(grid);
  addPositionXY();
}

function addPositionXY() {
  let gridCell = document.querySelectorAll(".cell");
  let i = 0;

  for (let x = 1; x < 11; x++) {
    for (let y = 1; y < 11; y++) {
      gridCell[i].setAttribute("posX", x);
      gridCell[i].setAttribute("posY", y);
      i++;
    }
  }
}

function colorCell(event) {
  if (dice > 0 && event.target.style.backgroundColor !== "red") {
    event.target.style.backgroundColor = "red";
    dice--;
  }
}

function clearCell(event) {
  if (event.target.style.backgroundColor === "red") {
    event.target.style.backgroundColor = "white";
    dice++;
  }
}

//Create grid
createGrid();

const COL = 2;
const ROW = 3;
let dice = COL * ROW;
let maxLength;

if (COL > ROW) {
  maxLength = COL;
} else {
  maxLength = ROW;
}

let grid = document.querySelector(".grid");

grid.addEventListener("click", colorCell);
grid.addEventListener("dblclick", clearCell);
