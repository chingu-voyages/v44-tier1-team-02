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