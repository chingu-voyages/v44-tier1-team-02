const backgroundImages = document.querySelectorAll(".background-image");
const narrationTextElement = document.getElementById("narration-text");
const text = "This is what is happening right now due to human overexploitation of our planet. But fear not, together we can save it.";

let index = 0;

function typeWriter() {
  if (index < text.length) {
    narrationTextElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 50); // Adjust the delay between each character appearing
  }
}

// Fade in background images
backgroundImages.forEach((image, index) => {
  setTimeout(() => {
    image.style.opacity = "1";
  }, (index + 1) * 1000); // Adjust the delay between each image fading in
});

// Start narration after background images have appeared
setTimeout(() => {
  typeWriter();
}, (backgroundImages.length + 1) * 1000); // Adjust the delay before narration starts
