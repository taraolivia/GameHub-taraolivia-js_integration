document.addEventListener("DOMContentLoaded", function () {
  const gameId = new URLSearchParams(window.location.search).get("id");
  if (!gameId) {
    console.error("Game ID is missing from the URL.");
    document.getElementById("game-title").textContent = "Game ID is not provided!";
    return;
  }

  fetch(`https://api.noroff.dev/api/v1/gamehub/${gameId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch: " + response.statusText);
      }
      return response.json();
    })
    .then((game) => {
      document.title = game.title + " | Game Hub"; // Sets the page title
      document.getElementById("game-title").textContent = game.title || "Title not available"; // Sets the title in the page body
      document.getElementById("game-subtitle").textContent = game.subtitle || "An exciting game experience.";
      document.getElementById("game-image").src = game.image;
      document.getElementById("game-image").alt = game.name + " cover";
      document.getElementById("game-price").textContent = `€${game.price}`;
      document.getElementById("game-description").textContent = game.description;
      document.getElementById("game-ranking").textContent = "Top 10 in games right now";
      document.getElementById("game-reviews").textContent = "4.9 - 529 reviews";

      // Update breadcrumbs after game details are fetched
      if (typeof updateBreadcrumbs === "function") {
        updateBreadcrumbs(game.title, game.genre);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch game details:", error);
      document.getElementById("game-title").textContent = "Game details cannot be loaded at this time.";
    });
});
