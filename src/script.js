

let error = document.querySelector(".error-correct-container");
let closeIcon = document.querySelector(".close-correct");

function addAlert(event){
if(colorCell.length == score + 1){
  error.classList.remove("display")
  
  }
}

function closeBox(event){
  let closeGreen = document.querySelector(".error-correct-container");
  closeGreen.classList.add("display")
}

closeIcon.addEventListener("click", closeBox)

