// page section
// const sections = document.querySelectorAll('.content-container');

// function showNextSection(index) {
//   if (index >= sections.length) {
//     return;
//   }

//   sections[index].classList.add('active');

//   setTimeout(() => {
//     sections[index].classList.remove('active');
//     showNextSection(index + 1);
//   }, 2000); // Adjust the duration (in milliseconds) for each section

// }

// showNextSection(0);

//Text writing effect of quote
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





