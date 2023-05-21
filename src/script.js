

let z = ["assets/dice-images/dice1.png","assets/dice-images/dice2.png","assets/dice-images/dice3.png","assets/dice-images/dice4.png","assets/dice-images/dice5.png","assets/dice-images/dice6.png"];

//Add event listener to the dice button
var diceBtn = document.getElementById("dice-btn");
diceBtn.addEventListener("click", rollDice);


/**
 * Function to roll the dice
 */
function rollDice(){
    // Generate random numbers for the dice images
    let x = Math.floor((Math.random() * z.length)+1);
    let y = Math.floor((Math.random() * z.length)+1);

     // Set the source attribute of the dice images
    document.querySelector(".img1").setAttribute("src",z[x-1]);
    document.querySelector(".img2").setAttribute("src",z[y-1]);
}

















