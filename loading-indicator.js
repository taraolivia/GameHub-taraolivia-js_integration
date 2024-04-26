// This script handles showing and hiding a spinner, manipulating game content visibility, and managing loading indicators.

// Function to show the spinner
function showSpinner() {
  const spinner = document.querySelector(".spinner-container");
  if (spinner) {
    spinner.style.display = "flex";
  } else {
    console.error("Spinner container not found.");
  }
}

// Function to hide the spinner
function hideSpinner() {
  const spinner = document.querySelector(".spinner-container");
  if (spinner) {
    spinner.style.display = "none";
    showGameContent(); // Show hidden game content
  } else {
    console.error("Spinner container not found.");
  }

}

// Hide the loading indicator when the page is fully loaded
window.addEventListener("load", function () {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  } else {
    console.error("Loading indicator not found.");
  }
});

// Function to display game content that is initially hidden
function showGameContent() {
  const gameContent = document.querySelector(".hidden-until-loaded");
  if (gameContent) {
    gameContent.style.display = "block";
  } else {
    console.error("Game content container not found.");
  }
}

// Show game content and manage loading indicators for anchor tags on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {

  // Set up loading indicators for anchor tags that likely cause a new page load or significant content change
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Optionally, only show loading indicator for links that do not have '#' (adjust based on actual requirements)
      if (!link.href.includes("#")) {
        showSpinner(); // Show spinner when a significant navigation is initiated
      }
    });
  });
});
