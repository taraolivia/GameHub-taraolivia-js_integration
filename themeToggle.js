const toggleButton = document.getElementById("themeToggle");
const body = document.body;

function toggleTheme() {
  const darkMode = !body.classList.contains("dark");
  localStorage.setItem("mode", darkMode ? "dark" : "light");
  body.classList.toggle("dark", darkMode);
  toggleButton.checked = darkMode;
}

function applyInitialTheme() {
  body.classList.add('no-transition');

  const storedTheme = localStorage.getItem("mode");
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme) {
    body.classList.toggle("dark", storedTheme === "dark");
    toggleButton.checked = (storedTheme === "dark");
  } else if (prefersDark) {
    body.classList.add("dark");
    toggleButton.checked = true;
    localStorage.setItem("mode", "dark");
  } else {
    toggleButton.checked = false;
  }

  setTimeout(() => {
    body.classList.remove('no-transition'); 
  }, 300); 
}

toggleButton.addEventListener("click", toggleTheme);
document.addEventListener("DOMContentLoaded", applyInitialTheme);










