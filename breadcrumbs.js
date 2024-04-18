const breadcrumbConfig = {
  "/": ["Home"], // Assuming 'index.html' is equivalent to the root '/'
  "/about-us.html": ["Home", "About Us"], // Assuming pages are accessed with '.html' extension
  "/games.html": ["Home", "Games"],
  "/single-game.html": ["Home", "Games"],
  "/blog.html": ["Home", "Blog"],
  "/blog/blog-post-1.html": ["Home", "Blog", "Blog post 1"],
  "/blog/blog-post-2.html": ["Home", "Blog", "Blog post 2"],
  "/blog/blog-post-3.html": ["Home", "Blog", "Blog post 3"],
  "/contact.html": ["Home", "Contact"],
  "/testimonies.html": ["Home", "Testimonies"],
  "/terms-and-conditions.html": ["Home", "Terms and Conditions"],
};

document.addEventListener("DOMContentLoaded", generateBreadcrumbs);

function generateBreadcrumbs() {
  console.log("Generating breadcrumbs...");
  const breadcrumbList = document.getElementById("breadcrumb-list");
  if (!breadcrumbList) {
    console.error("Breadcrumb list element not found.");
    return;
  }

  const path = window.location.pathname;
  console.log("Current Path:", path);
  const breadcrumbs = breadcrumbConfig[path] || ["Home"]; // Default to "Home" if no match found
  console.log("Breadcrumbs:", breadcrumbs);

  breadcrumbList.innerHTML = breadcrumbs
    .map((crumb, index) => {
      const isActive = index === breadcrumbs.length - 1;
      const url = isActive ? "" : "/"; // Placeholder, adjust if you have specific paths
      return `<li>${isActive ? `<span class="breadcrumbs__item active">${crumb}</span>` : `<a href="${url}" class="breadcrumbs__item">${crumb}</a>`}</li>`;
    })
    .join("");
}


