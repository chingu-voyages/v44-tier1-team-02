const grid = document.querySelector('.grid-2');
const output = { rows: 10, cols: 10 };
const total = output.rows * output.cols;

function createGrid() {
  for (let i = 0; i < output.rows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < output.cols; j++) {
      const cell = document.createElement('td');
      cell.classList.add('box');
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  createGrid();
});

