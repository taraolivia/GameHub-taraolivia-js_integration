document.addEventListener("DOMContentLoaded", fetchAllGames);

// Fetches all games from the API and decides which function to call based on the page
async function fetchAllGames() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
    const games = await response.json();
    console.log("API call successful, full response received:", games);

    if (games && Array.isArray(games) && games.length > 0) {
      if (document.getElementById("trending-games-container")) {
        displayTrendingGames(games);
      }
      if (document.getElementById("all-games-container")) {
        displayGames(games);
      }
    } else {
      console.error("No valid games data found:", games);
    }
  } catch (error) {
    console.error("Failed to fetch games:", error);
  }
}

// Displays only selected trending games
function displayTrendingGames(games) {
  const container = document.getElementById("trending-games-container");
  const trendingIds = ["26594301-ad8e-4691-a2ca-c774f50b1b21", "2bbaab8b-57b0-47f6-ab8d-8d443ac767da", "cac3b2cd-1611-4007-9883-3adf6f74948f"];
  const trendingGames = games.filter((game) => trendingIds.includes(game.id));

  updateGamesDisplay(trendingGames, container);
}

// Displays all games
function displayGames(games) {
  const container = document.getElementById("all-games-container");
  updateGamesDisplay(games, container);
}

// Helper function to create game card elements and update the DOM
function updateGamesDisplay(games, container) {
  if (!container) {
    console.error("Specific games container not found. Check your HTML IDs and ensure the DOM is fully loaded.");
    return;
  }
  container.innerHTML = "";
  games.forEach((game) => {
    container.appendChild(createElementForGame(game));
  });
}

// Creates HTML for a game card
function createElementForGame(game) {
  const gameCard = document.createElement("div");
  gameCard.className = "game-card";
  const imageUrl = game.image || "assets/images/default-image.png";
  const imageAlt = `${game.title} cover`;

  // Correct the href to point to 'single-game.html' with the game's ID as a query parameter
  const singleGameUrl = `single-game.html?id=${game.id}`; // Construct the URL dynamically

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

