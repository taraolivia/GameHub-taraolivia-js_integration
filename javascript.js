
//Page loader animation
const loaderContainer = document.querySelector(".loader-container");

window.addEventListener("load", () => {
  loaderContainer.classList.add("loader-container-hidden");
});

window.addEventListener("load", () => {
  loaderContainer.classList.add("loader-container-hidden");
  setTimeout(() => {
    loaderContainer.parentElement.removeChild(loaderContainer);
  }, 500); // Match the timeout with your CSS transition duration
});

