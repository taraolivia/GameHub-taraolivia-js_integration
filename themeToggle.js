// JavaScript for toggling theme
const toggleButton = document.getElementById("themeToggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleButton.textContent = body.classList.contains("dark") ? "Toggle Light Mode" : "Toggle Dark Mode";
});
