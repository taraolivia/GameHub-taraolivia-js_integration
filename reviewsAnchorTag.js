function openTab(event, tabName) {
  // Hide all tab contents
  const tabContents = document.getElementsByClassName("tab-content");
  for (const content of tabContents) {
    content.style.display = "none";
  }

  // Remove the 'active' class from all tab titles
  const tabTitles = document.getElementsByClassName("tab-title");
  for (const title of tabTitles) {
    title.classList.remove("active");
  }

  // Show the selected tab content
  const selectedTabContent = document.getElementById(tabName);
  if (selectedTabContent) {
    selectedTabContent.style.display = "block";
  }

  // Add the 'active' class to the clicked tab title
  event.currentTarget.classList.add("active");

  // If the selected tab is "Reviews", show the review cards container
  if (tabName === "Reviews") {
    const reviewCardsContainer = document.getElementById("review-cards-container");
    if (reviewCardsContainer) {
      reviewCardsContainer.style.display = "block";
    }
  }
}

function smoothScroll(target) {
  const element = document.getElementById(target);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    return false; // Prevent default anchor behavior
  }
}

document.getElementById("reviews-link").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default behavior of the anchor tag
  const reviewsTab = document.getElementById("Reviews");
  if (reviewsTab) {
    reviewsTab.scrollIntoView({ behavior: "smooth" }); // Scroll to the reviews section smoothly
  }
});
