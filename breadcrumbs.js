function updateBreadcrumbs(gameTitle, gameGenre) {
  const breadcrumbList = document.getElementById("breadcrumb-list");
  breadcrumbList.innerHTML = ""; // Clear existing breadcrumbs

  // Define an array of breadcrumb parts
  const paths = [
    { name: "Home", url: "index.html" },
    { name: "Games", url: "games.html" },
    { name: gameGenre, url: `games-genre.html?genre=${encodeURIComponent(gameGenre)}` }, // Link to a genre-specific page
    { name: gameTitle, url: `single-game.html?id=${new URLSearchParams(window.location.search).get("id")}` },
  ];

  // Generate breadcrumb items
  paths.forEach((path, index) => {
    const crumb = document.createElement("li");
    if (index === paths.length - 1) {
      // Last item is the current page
      crumb.innerHTML = `<span class="breadcrumbs__item active">${path.name}</span>`;
    } else {
      crumb.innerHTML = `<a href="${path.url}" class="breadcrumbs__item">${path.name}</a>`;
    }
    breadcrumbList.appendChild(crumb);
  });
}

// Call this function when game details are fetched
fetchGameDetails().then((game) => {
  updateBreadcrumbs(game.title, game.genre); // Ensure 'title' and 'genre' are the correct properties as received from your API
});
