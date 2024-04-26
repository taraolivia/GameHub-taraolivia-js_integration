// Display functions for games
function displayGames(games) {
  const container = document.getElementById("all-games-container");
  if (container) {
    updateGamesDisplay(games, container);
    container.parentElement.style.display = "block"; // Show the parent container of the games
  }
}

function displayTrendingGames(games) {
  const container = document.getElementById("trending-games-container");
  if (container) {
    updateGamesDisplay(games, container);
  }
}

// This async function fetches trending games data and displays them.
async function fetchTrendingGames() {
  showSpinner(); // Show the spinner before starting the display process.

  try {
    // Manually create an array to store the IDs of the specific games you want to fetch.
    const gameIds = [
      "2bbaab8b-57b0-47f6-ab8d-8d443ac767da",
      "cac3b2cd-1611-4007-9883-3adf6f74948f",
      "26594301-ad8e-4691-a2ca-c774f50b1b21"
    ];

    // Create an array to store the fetched games.
    const trendingGames = [];

    // Loop through the game IDs and fetch each game from the API.
    for (const id of gameIds) {
      // Perform the network request to the API to fetch the game details.
      const response = await fetch(`https://api.noroff.dev/api/v1/gamehub/${id}`);
      // Convert the response into JSON format.
      const game = await response.json();
      // Add the fetched game to the trendingGames array.
      trendingGames.push(game);
    }

    // Display trending games in the "trending games" section.
    displayTrendingGames(trendingGames);
  } catch (error) {
    // Log any errors that occur during the display process.
    console.error("Failed to display trending games:", error);
  } finally {
    // Always hide the spinner after the display process is complete, regardless of success or failure.
    hideSpinner();
  }
}



// Initialize and fetch trending games when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  fetchTrendingGames();
  setupNavigationListeners();
});

// This async function fetches all games data from the API, manages UI updates based on fetched data, and handles errors.
async function fetchAllGames() {
  showSpinner(); // Show the spinner before starting the network request.

  try {
    // Perform the network request to the API.
    const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
    // Convert the response into JSON format.
    const games = await response.json();

    // Store the games data in sessionStorage for later use without needing to re-fetch.
    sessionStorage.setItem("games", JSON.stringify(games));

    // Check if the games data is valid and not empty.
    if (games && Array.isArray(games) && games.length > 0) {
      // Generate filter buttons based on the genres available in the games data.
      generateGenreButtons(games);

      // Display games in the "trending games" section if the container exists.
      if (document.getElementById("trending-games-container")) {
        displayTrendingGames(games);
      }

      // Display games in the "all games" section if the container exists.
      if (document.getElementById("all-games-container")) {
        displayGames(games);
      }
    } else {
      // Log an error if no valid games data is found.
      console.error("No valid games data found:", games);
    }
  } catch (error) {
    // Log any errors that occur during the fetch operation.
    console.error("Failed to fetch games:", error);
  } finally {
    // Always hide the spinner after the operations are complete, regardless of success or failure.
    hideSpinner();
  }
}

// Initialize and fetch all games when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  fetchAllGames();
  setupNavigationListeners();
});

// Set up listeners for navigation links
function setupNavigationListeners() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      const loadingIndicator = document.getElementById("loading-indicator");
      if (loadingIndicator) loadingIndicator.style.display = "flex";
    });
  });

  // Hide the global loading indicator when the page fully loads
  window.addEventListener("load", function () {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) loadingIndicator.style.display = "none";
  });
}

// Helper function to update the display of games in the given container
function updateGamesDisplay(games, container) {
  container.innerHTML = ""; // Clear previous content
  games.forEach((game) => {
    container.appendChild(createElementForGame(game));
  });
}

// Helper function to create an HTML element for each game
function createElementForGame(game) {
  const gameCard = document.createElement("div");
  gameCard.className = "game-card";
  const imageUrl = game.image || "assets/images/default-image.png";
  const imageAlt = `${game.title} cover`;
  const singleGameUrl = `single-game.html?id=${game.id}`; // Constructs the URL dynamically

  gameCard.innerHTML = `
        <img class="game-image" src="${imageUrl}" alt="${imageAlt}" />
        <div class="game-card-text-flex">
            <h3 class="game-card-title">${game.title}</h3>
            <p class="game-card-price">€${game.onSale ? game.discountedPrice.toFixed(2) : game.price.toFixed(2)}</p>
        </div>
        <a href="${singleGameUrl}" class="button game-card-button" alt="Buy ${game.title} now">Buy now</a>
    `;
  return gameCard;
}
