document.addEventListener("DOMContentLoaded", function () {
  const gameId = new URLSearchParams(window.location.search).get("id");
  if (!gameId) {
    console.error("Game ID is missing from the URL.");
    document.getElementById("game-title").textContent = "Game ID is not provided!";
    return;
  }

  const gameURL = `https://api.noroff.dev/api/v1/gamehub/${gameId}`;
  fetch(gameURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    })
    .then((game) => {
      // Set page title and content with fetched game details
      document.title = `${game.title} | Game Hub`;
      document.getElementById("game-title").textContent = game.title || "Title not available";
      document.getElementById("game-subtitle").textContent = game.subtitle || "An exciting game experience.";
      document.getElementById("game-image").src = game.image;
      document.getElementById("game-image").alt = `${game.title} cover`;
      document.getElementById("game-price").textContent = `€${game.price.toFixed(2)}`;
      document.getElementById("game-description").textContent = game.description;

      const thumbnailsContainer = document.getElementById("thumbnail-container");
      thumbnailsContainer.innerHTML = ""; // Clear existing thumbnails if any
      // Create main thumbnail
      createThumbnail(thumbnailsContainer, game.image, game.title, true);

      // Static thumbnails
      const staticImages = ["assets/images/static1.jpg", "assets/images/static2.jpg", "assets/images/static3.jpg"];
      staticImages.forEach((image) => createThumbnail(thumbnailsContainer, image, "Game Image"));

      initializeThumbnailClicks();
      updateBreadcrumbsForGame(game.title, game.genre);
    })
    .catch((error) => {
      console.error("Failed to fetch game details:", error);
      document.getElementById("game-title").textContent = "Game details cannot be loaded at this time.";
    });
});

function updateBreadcrumbsForGame(title, genre) {
  const breadcrumbList = document.getElementById("breadcrumb-list");
  if (!breadcrumbList) {
    console.error("Breadcrumb list element not found.");
    return;
  }

  const baseCrumbs = ["Home", "Games"];
  const fullCrumbs = [...baseCrumbs, genre, title];

  breadcrumbList.innerHTML = fullCrumbs
    .map((crumb, index) => {
      const isActive = index === fullCrumbs.length - 1;
      const url = isActive ? "" : "#"; // Placeholder URL, ideally would link to correct page
      return `<li>${isActive ? `<span class="breadcrumbs__item active">${crumb}</span>` : `<a href="${url}" class="breadcrumbs__item">${crumb}</a>`}</li>`;
    })
    .join("");
}

function createThumbnail(container, src, alt, isActive = false) {
  const img = document.createElement("img");
  img.className = "thumbnail" + (isActive ? " active" : "");
  img.src = src;
  img.alt = alt;
  container.appendChild(img);
}

function initializeThumbnailClicks() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("game-image");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mainImage.src = this.src;
      mainImage.alt = this.alt;
      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });
}
