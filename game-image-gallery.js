// Update JavaScript functions to work with your HTML structure
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".mySlides"); // Use querySelectorAll to get all elements with the class "mySlides"
  let dots = document.querySelectorAll(".demo"); // Use querySelectorAll to get all elements with the class "demo"
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active"); // Remove the "active" class from all dots
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active"); // Add the "active" class to the current dot
}
