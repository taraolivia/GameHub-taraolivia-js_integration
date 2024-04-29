const toggleButton = document.getElementById("themeToggle");
const body = document.body;

function toggleTheme() {
  const darkMode = !body.classList.contains("dark");
  localStorage.setItem("mode", darkMode ? "dark" : "light");
  body.classList.toggle("dark", darkMode);
}

toggleButton.addEventListener("click", toggleTheme);










