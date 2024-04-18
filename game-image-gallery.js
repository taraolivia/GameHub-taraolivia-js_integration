document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("game-image");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mainImage.src = this.src; // Change the main image source to the clicked thumbnail's source
      mainImage.alt = this.alt; // Update the alt text
    });
  });
});
