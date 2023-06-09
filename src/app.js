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


// character

