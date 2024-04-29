// JavaScript for toggling theme
const toggleButton = document.getElementById("themeToggle");
const body = document.body;

// Function to set theme based on user preference stored in local storage
function setTheme() {
  const mode = localStorage.getItem("mode");
  if (mode === "dark") {
    body.classList.add("dark");
    toggleButton.textContent = "Toggle Light Mode";
  } else {
    body.classList.remove("dark");
    toggleButton.textContent = "Toggle Dark Mode";
  }
}

// Call setTheme() when the page loads to apply the stored theme
setTheme();

// Function to initialize the toggle icon based on the initial state of the toggle checkbox
function initializeToggleIcon() {
  const themeToggle = document.getElementById("themeToggle");
  const toggleHandle = document.querySelector(".toggle-handle");

  if (themeToggle.checked) {
    // Dark mode is initially selected
    toggleHandle.innerHTML = `<img src="assets/images/icons8/icons8-download-from-cloud-96 (1).png" alt="Dark Mode Icon" class="dark-mode-icon">`;
    toggleHandle.style.backgroundColor = "#5f5"; // Change slider color to indicate dark mode
  } else {
    // Light mode is initially selected
    toggleHandle.innerHTML = `<img src="assets/images/icons8/icons8-star-64.png" alt="Light Mode Icon" class="light-mode-icon">`;
    toggleHandle.style.backgroundColor = "#ccc"; // Change slider color to indicate light mode
  }
}

// Call the function to initialize the toggle icon
initializeToggleIcon();

// Event listener for toggling theme
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  const mode = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("mode", mode);
  toggleButton.textContent = body.classList.contains("dark") ? "Toggle Light Mode" : "Toggle Dark Mode";
});

// Event listener to update the toggle icon when the toggle state changes
themeToggle.addEventListener("change", function () {
  const toggleHandle = document.querySelector(".toggle-handle");

  if (themeToggle.checked) {
    // Dark mode is selected
    toggleHandle.innerHTML = `<img src="assets/images/icons8/icons8-download-from-cloud-96 (1).png" alt="Dark Mode Icon" class="dark-mode-icon">`;
    toggleHandle.style.backgroundColor = "#5f5"; // Change slider color to indicate dark mode
  } else {
    // Light mode is selected
    toggleHandle.innerHTML = `<img src="assets/images/icons8/icons8-star-64.png" alt="Light Mode Icon" class="light-mode-icon">`;
    toggleHandle.style.backgroundColor = "#ccc"; // Change slider color to indicate light mode
  }
});






