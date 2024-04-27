function generateGenreButtons(games) {
  const genreSet = new Set(); // Use a Set to avoid duplicate genres
  games.forEach((game) => genreSet.add(game.genre));

  const buttonsContainer = document.getElementById("genre-buttons");
  buttonsContainer.innerHTML = ""; // Clear existing buttons if any

  // Create the 'All' button
  const allButton = document.createElement("button");
  allButton.className = "genre-button selected"; // Add the "selected" class
  allButton.textContent = "All";
  allButton.dataset.genre = "all"; // Set the data-genre attribute
  allButton.addEventListener("click", () => {
    filterProduct("all");
    // Remove the "selected" class from all buttons
    buttonsContainer.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));
    // Add the "selected" class to the 'All' button
    allButton.classList.add("selected");
  });
  buttonsContainer.appendChild(allButton); // Add 'All' button

  // Create buttons for each genre
  genreSet.forEach((genre) => {
    const button = document.createElement("button");
    button.className = "genre-button";
    button.textContent = genre;
    button.dataset.genre = genre; // Set the data-genre attribute
    button.addEventListener("click", () => {
      filterProduct(genre);
      // Remove the "selected" class from all buttons
      buttonsContainer.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));
      // Add the "selected" class to the clicked button
      button.classList.add("selected");
    }); // Add event listener for filtering
    buttonsContainer.appendChild(button);
  });

  // Create the 'On Sale' button
  const onSaleButton = document.createElement("button");
  onSaleButton.className = "genre-button";
  onSaleButton.textContent = "On Sale";
  onSaleButton.dataset.genre = "on-sale"; // Set the data-genre attribute
  onSaleButton.addEventListener("click", () => {
    filterProduct("on-sale");
    // Remove the "selected" class from all buttons
    buttonsContainer.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));
    // Add the "selected" class to the 'On Sale' button
    onSaleButton.classList.add("selected");
  });
  buttonsContainer.appendChild(onSaleButton); // Add 'On Sale' button
}

function filterProduct(genre) {
  const games = JSON.parse(sessionStorage.getItem("games")); // Make sure this is being set somewhere after fetching games
  let filteredGames;

  if (genre === "all") {
    filteredGames = games;
  } else if (genre === "on-sale") {
    filteredGames = games.filter((game) => game.onSale); // Filter games that are on sale
  } else {
    filteredGames = games.filter((game) => game.genre === genre);
  }

  updateGamesDisplay(filteredGames, document.getElementById("all-games-container"));

  // Remove the "selected" class from all buttons
  document.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));

  // Add the "selected" class to the clicked button
  document.querySelector(`.genre-button[data-genre="${genre}"]`).classList.add("selected");
}
