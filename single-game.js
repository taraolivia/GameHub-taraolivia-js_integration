// single-game.js
document.addEventListener("DOMContentLoaded", function () {
  const gameId = new URLSearchParams(window.location.search).get("id");
  if (!gameId) {
      console.error("Game ID is missing from the URL.");
      document.getElementById("game-title").textContent = "Game ID is not provided!";
      return;
  }

  fetchGameData(gameId);
  displaySimilarGames(gameId);
});

async function fetchGameData(gameId) {
  showSpinner();
  const gameURL = `https://api.noroff.dev/api/v1/gamehub/${gameId}`;
  
  try {
    const response = await fetch(gameURL);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    
    const game = await response.json();
    populateGameDetails(game);
    hideSpinner();
  } catch (error) {
    console.error("Failed to fetch game details:", error);
    document.getElementById("game-title").textContent = "Game details cannot be loaded at this time.";
    hideSpinner();
  }
}


function showSpinner() {
  const spinner = document.querySelector(".spinner-container");
  if (spinner) {
    spinner.style.display = "flex";
  } else {
    console.error("Spinner container not found.");
  }
}

function hideSpinner() {
  const spinner = document.querySelector(".spinner-container");
  if (spinner) {
    spinner.style.display = "none";
  } else {
    console.error("Spinner container not found.");
  }
}

function showContent() {
  const contentContainer = document.querySelector(".hidden-until-loaded");
  if (contentContainer) {
    contentContainer.style.visibility = "visible"; // Make the content visible
  } else {
    console.error("Content container not found.");
  }
}

function populateGameDetails(game) {
  const gameTitleElement = document.getElementById("game-title");
  const gameImageElement = document.getElementById("game-image");
  const thumbnailImageElement = document.getElementById("api-thumbnail");
  const addToCartButton = document.querySelector('.button--add_to_cart');
  



  if (!gameTitleElement || !gameImageElement || !thumbnailImageElement || !addToCartButton) {
      console.error("One or more required elements not found.");
      return; // Early exit if essential elements are missing
  }

  // Populate game details
  gameTitleElement.textContent = game.title || "Title not available";
  gameImageElement.src = game.image;
  gameImageElement.alt = `${game.title} cover`;
  thumbnailImageElement.src = game.image;
  thumbnailImageElement.alt = `${game.title} thumbnail`;

  // Set data-product-id for the add to cart button
  addToCartButton.setAttribute('data-product-id', game.id);
 updateButtonText()



  // Add event listener for adding to cart
  addToCartButton.addEventListener('click', function() {
      addToCart(game.id, addToCartButton);
      updateButtonText();
  });


  function updateButtonText() {
    const singleGameId = addToCartButton.getAttribute('data-product-id')
    const singleGameButton = document.getElementById('add-to-cart-btn');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = cartItems.some(item => item.id === singleGameId);

    if (isInCart) {
      singleGameButton.innerHTML = `
      <p>      Remove from cart
      </p>
    `;
    singleGameButton.classList.add ('background-color-darkened');
  }
 else {
  singleGameButton.innerHTML = `
  <p>      Add to cart
  </p>`; 
  singleGameButton.classList.remove ('background-color-darkened');

 }
  }


  // Continue setting other game details
  displayGamePrice(game);
  updateDetails("game-subtitle", game.subtitle || "An exciting game experience.", false, game);
  updateDetails("game-description", game.description, false, game);
  updateDetails("game-age-rating", game.ageRating || "Age rating not available", false, game);
  updateDetails("game-genre", game.genre || "Genre not available", false, game);
  updateDetails("game-released", game.released || "Release date not available", false, game);
  updateBreadcrumbsForGame(game.title, game.genre);
}

function displayGamePrice(game) {
  const gamePriceElement = document.getElementById("game-price");
  if (game.onSale) {
      gamePriceElement.innerHTML = `
        <span class="original-price">Original Price: €${game.price.toFixed(2)}</span>
        <span class="discounted-price">Discounted Price: €${game.discountedPrice.toFixed(2)}</span>
      `;
  } else {
      gamePriceElement.textContent = `Price: €${game.price.toFixed(2)}`;
  }
}

function displayGamePriceSmaller(game) {
  if (game.onSale) {
    return `
      <span class="original-price-smaller">€ ${game.price.toFixed(2)}</span>
      <span class="discounted-price-smaller">€ ${game.discountedPrice.toFixed(2)}</span>
    `;
  } else {
    return `€${game.price.toFixed(2)}`;
  }
}


function updateDetails(id, value, isImage = false, game) {
  const element = document.getElementById(id);
  if (element) {
      if (isImage) {
          element.src = value;
          element.alt = `${game.title} main image`;
      } else {
          element.textContent = value;
      }
  } else {
      console.error(`${id} element not found.`);
  }
}

// Ensure this function is correctly defining breadcrumb structure
function updateBreadcrumbsForGame(title, genre) {
  const breadcrumbList = document.getElementById("breadcrumb-list");
  if (breadcrumbList) {
      const baseCrumbs = ["Home", "Games"];
      const fullCrumbs = [...baseCrumbs, genre, title];
      breadcrumbList.innerHTML = fullCrumbs.map((crumb, index) => {
          const isActive = index === fullCrumbs.length - 1;
          return `<li>${isActive ? `<span class="breadcrumbs__item active">${crumb}</span>` : `<a href="#" class="breadcrumbs__item">${crumb}</a>`}</li>`;
      }).join("");
  } else {
      console.error("Breadcrumb list element not found.");
  }
}


async function displaySimilarGames(gameId) {
  try {
    // Fetch the current game data
    const response = await fetch(`https://api.noroff.dev/api/v1/gamehub/${gameId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch game: ${response.statusText}`);
    }
    const game = await response.json();

    // Display similar games based on the genre of the current game
    await displaySimilarGamesByGenre(gameId, game.genre); // Await here to ensure completion
  } catch (error) {
    console.error("Failed to fetch game details:", error);
  }
}

// Function to display similar games based on genre
async function displaySimilarGamesByGenre(currentGameId, currentGameGenre) {
  try {
    // Retrieve games data from sessionStorage
    const games = JSON.parse(sessionStorage.getItem("games"));

    // Check if games data is available
    if (games && Array.isArray(games) && games.length > 0) {
      // Filter games based on the current game's genre, excluding the current game
      const similarGames = games.filter((game) => game.genre === currentGameGenre && game.id !== currentGameId);

      // Display similar games on the webpage
      const similarGamesContainer = document.getElementById("similar-games-container");
      similarGamesContainer.innerHTML = ""; // Clear previous content

      similarGames.forEach((game) => {
        const gameElement = document.createElement("div");
        const singleGameUrl = `single-game.html?id=${game.id}`; // Constructs the URL dynamically

        gameElement.className = "small-game-card";
        gameElement.innerHTML = `
          <div class="small-game-card-left">
            <img src="${game.image}" alt="${game.title}" />
          </div>
          <div class="small-game-card-middle">
            <p>${game.title}</p>
          </div>
          <div class="small-game-card-right">
            <p>
  ${displayGamePriceSmaller(game)}
            </p>
            <a href="${singleGameUrl}" class="button button--small"><p>View now</p></a>
          </div>
        `;
        similarGamesContainer.appendChild(gameElement);
      });
    } else {
      // Log an error if games data is not available or empty
      console.error("No valid games data found:", games);
    }
  } catch (error) {
    console.error("Error displaying similar games:", error);
  }
}

