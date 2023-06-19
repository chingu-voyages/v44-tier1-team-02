// Text writing effect of quote
const quotes = document.querySelectorAll('.quote');

quotes.forEach((quote) => {
    const narrationText = quote.querySelector('h1');
    const text = narrationText.textContent;
    narrationText.textContent = '';

    let index = 0;

    function writeText() {
        narrationText.textContent += text[index];
        index++;

        if (index < text.length) {
            setTimeout(writeText, 100); // Adjust the delay between each letter (in milliseconds)
        }
    }

    writeText();
});

// Add event listener to the play button
document.getElementById("play-button").addEventListener("click", function() {
    // Navigate to game-page.html
    window.location.href = "src/html/game-page.html";
});

// Set up the storyline in the Welcome Section
const welcomeNarrationText = document.getElementById("narration-text");
const storyline = "Our owl home is an enchanted forest and is facing danger due to deforestation. This is leading to various other problems, as shown in the next four sections in the Story Section.";

// Delay the start of the storyline narration for a better user experience
setTimeout(function() {
    welcomeNarrationText.textContent = storyline;
}, 2000); // Delay in milliseconds before starting the storyline narration
