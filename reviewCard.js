

document.addEventListener("DOMContentLoaded", function () {
  const reviewCardsContainer = document.querySelector("#review-cards-container");
  const showMoreButton = document.getElementById("show-more-btn");

  // Function to generate a random number of stars (3 to 5)
  function generateRandomStars() {
    return Math.floor(Math.random() * 3) + 3;
  }

  // Function to generate a random icon path
function generateRandomIconPath() {
  const iconFolder = "assets/images/testimonials/";
const iconNames = ["testimonial-1.png", "testimonial-2.png", "testimonial-3.png", "testimonial-4.png", "testimonial-5.png", "testimonial-6.png", "testimonial-7.png", "testimonial-8.png", "testimonial-9.png", "testimonial-10.png", "testimonial-11.png", "testimonial-12.png"];
  const randomIconName = iconNames[Math.floor(Math.random() * iconNames.length)];
  return iconFolder + randomIconName;
}

  // Function to generate random review text
  function generateRandomReviewText() {
    const reviews = [
      "I was pleasantly surprised by this game! The gameplay mechanics are smooth and intuitive.",
      "The graphics are stunning! I found myself immersed in the game world from the very beginning.",
      "What a gem of a game! The storyline is captivating, and the characters are well-developed.",
      "I've been recommending this game to all my friends. It's a must-play!",
      "The attention to detail in this game is impressive. Every little aspect adds to the overall experience.",
      "I couldn't put this game down! It's addictive and keeps you engaged for hours.",
      "Kudos to the developers for creating such a masterpiece. It's clear they put a lot of heart into it.",
      "This game exceeded my expectations in every way. Definitely one of the best I've played.",
      "Bravo! This game strikes the perfect balance between challenge and enjoyment.",
      "I found myself lost in this game for hours on end. Time well spent, I'd say!",
      "I've played a lot of games, but this one stands out for its unique gameplay mechanics.",
      "The soundtrack alone is worth the price of admission. It adds so much depth to the gaming experience.",
      "I'm impressed by how well-polished this game is. It's clear the developers put a lot of thought into it.",
      "I was skeptical at first, but this game quickly won me over. It's a hidden gem!",
      "From the moment I started playing, I knew I was in for a treat. Highly recommended!",
      "What a ride! This game took me on an adventure I won't soon forget.",
      "I appreciated the attention to detail in this game. It's evident that the developers cared about delivering a quality experience.",
      "This game strikes the perfect balance between challenge and fun. It's accessible yet rewarding.",
      "The world-building in this game is top-notch. I felt like I was exploring a living, breathing universe.",
      "I've played through this game multiple times, and it never gets old. Each playthrough offers something new and exciting.",
      "I'm blown away by the level of craftsmanship in this game. It's clear the developers poured their hearts into it.",
      "This game is a testament to what can be achieved when creativity meets passion. Bravo to the team behind it!",
      "I can't get enough of this game! It's become a staple in my gaming library.",
      "What a journey! This game took me on an emotional rollercoaster from start to finish.",
      "I've been eagerly anticipating this game's release, and it did not disappoint. Worth every penny!",
      "I'm hooked! This game has become my new obsession.",
      "The character development in this game is outstanding. I felt a real connection to the protagonists.",
      "I'm impressed by the level of polish in this game. It's clear the developers paid attention to every detail.",
      "From the graphics to the gameplay, this game excels in every aspect. A true masterpiece!",
      "I've played my fair share of games, but this one stands out as something truly special.",
      "This game is a shining example of what the medium is capable of. It's both entertaining and thought-provoking.",
      "I'm in awe of the world-building in this game. It's rich, immersive, and full of surprises.",
      "I can't stop thinking about this game! It's left a lasting impression on me.",
      "I'm thoroughly impressed by the level of innovation in this game. It pushes the boundaries of what's possible in gaming.",
      "This game is a must-play for any fan of the genre. It sets a new standard for excellence.",
      "I've been eagerly awaiting this game's release, and it did not disappoint. It exceeded all my expectations!",
      "I'm blown away by the sheer scope of this game. There's so much content to explore and enjoy.",
      "This game is a work of art. Every frame is a masterpiece, and every moment is unforgettable.",
      "I'm amazed by the attention to detail in this game. It's clear the developers put their heart and soul into it.",
      "I've played through this game multiple times, and it never gets old. Each playthrough offers something new and exciting.",
      "This game is a triumph. It's a testament to what can be achieved through creativity, passion, and hard work.",
      "I'm captivated by the storytelling in this game. It kept me on the edge of my seat from start to finish.",
      "I'm hooked! This game has become a staple in my gaming rotation.",
      "The world-building in this game is phenomenal. It's immersive, expansive, and filled with secrets to uncover.",
      "I can't get enough of this game! It's become a part of my daily routine.",
      "This game is a labor of love. You can feel the passion and dedication that went into its creation.",
      "I'm impressed by the level of craftsmanship in this game. It's evident that the developers poured their hearts into it.",
      "From the moment I started playing, I knew I was in for something special. This game exceeded all my expectations.",
      "I'm blown away by the depth of this game. There's so much to explore and discover.",
      "This game is a masterpiece. It's a shining example of what can be achieved through dedication and talent.",
      "I'm captivated by the world of this game. It's rich, vibrant, and teeming with life.",
      "I'm hooked! This game has become my new obsession.",
      "The attention to detail in this game is astounding. It's clear the developers went above and beyond to create something truly special.",
      "This game is a revelation. It's redefined my expectations for what a game can be.",
      "I'm in awe of the storytelling in this game. It's gripping, emotional, and unforgettable.",
      "I'm thoroughly impressed by the level of polish in this game. It's evident that the developers cared deeply about delivering a quality experience.",
      "From the gameplay to the graphics, this game is top-notch. It's clear the developers put a lot of love into it.",
      "I've played a lot of games, but this one stands out as something truly special. It's a masterpiece.",
      "This game is a triumph of creativity and innovation. It's a must-play for any fan of the genre.",
      "I'm captivated by the atmosphere of this game. It's immersive, haunting, and utterly engrossing.",
      "I'm hooked! This game has become my new obsession.",
      "The attention to detail in this game is second to none. It's clear the developers poured their hearts into it.",
      "This game is a work of art. Every aspect is beautifully crafted, from the visuals to the music.",
      "I'm blown away by the depth and complexity of this game. There's so much to explore and uncover.",
      "This game is a masterpiece. It's a shining example of what can be achieved through passion and dedication.",
      "I'm captivated by the world-building in this game. It's expansive, immersive, and full of surprises.",
      "I'm hooked! This game has become a permanent fixture in my gaming library.",
      "The attention to detail in this game is astounding. It's clear the developers put a lot of care into every aspect.",
      "This game is a revelation. It's raised the bar for what a game can be.",
      "I'm in awe of the storytelling in this game. It's gripping, emotional, and deeply resonant.",
      "I'm thoroughly impressed by the level of polish in this game. It's evident that the developers went above and beyond.",
      "From the graphics to the gameplay, this game is flawless. It's clear the developers poured their hearts into it.",
      "I've played countless games, but this one stands out as something truly special. It's a masterpiece.",
      "This game is a triumph of creativity and imagination. It's a must-play for any gaming enthusiast.",
      "I'm captivated by the atmosphere of this game. It's immersive, atmospheric, and utterly captivating.",
      "I'm hooked! This game has become my new obsession.",
      "The attention to detail in this game is second to none. It's clear the developers put a lot of thought into every aspect.",
      "This game is a work of art. Every aspect is meticulously crafted, from the visuals to the gameplay.",
      "I'm blown away by the depth and scope of this game. There's so much to discover and explore.",
      "This game is a masterpiece. It's a testament to the power of storytelling in gaming.",
      "I'm captivated by the world-building in this game. It's rich, immersive, and filled with lore.",
      "I'm hooked! This game has become an integral part of my gaming routine.",
      "The attention to detail in this game is unparalleled. It's clear the developers put a lot of love into it.",
      "This game is a revelation. It's redefined my expectations for what a game can be.",
      "I'm in awe of the storytelling in this game. It's compelling, emotional, and thought-provoking.",
      "I'm thoroughly impressed by the level of polish in this game. It's evident that the developers cared deeply about delivering a quality experience.",
      "From the gameplay to the graphics, this game is exceptional. It's clear the developers put their heart and soul into it.",
      "I've played many games, but this one stands out as something truly special. It's a masterpiece.",
      "This game is a triumph of creativity and vision. It's a must-play for any fan of the genre.",
      "I'm captivated by the atmosphere of this game. It's immersive, evocative, and utterly absorbing.",
      "I'm hooked! This game has become my new obsession.",
      "The attention to detail in this game is unmatched. It's clear the developers spared no expense in creating a truly immersive experience.",
      "This game is a work of art. Every element is carefully crafted, from the visuals to the sound design.",
      "I'm blown away by the depth and complexity of this game. There's so much to discover and uncover.",
      "This game is a masterpiece. It's a testament to the creativity and talent of the developers.",
      "I'm captivated by the world-building in this game. It's expansive, rich, and filled with history.",
      "I'm hooked! This game has become a permanent fixture in my gaming library.",
      "The attention to detail in this game is extraordinary. It's clear the developers poured their hearts into it.",
      "This game is a revelation. It's raised the bar for what a game can achieve.",
      "I'm in awe of the storytelling in this game. It's compelling, immersive, and emotionally resonant.",
      "I'm thoroughly impressed by the level of polish in this game. It's evident that the developers went above and beyond.",
      "From the graphics to the gameplay, this game is flawless. It's clear the developers put a lot of thought into every aspect.",
      "I've played countless games, but this one stands out as something truly special. It's a masterpiece.",
      "This game is a triumph of creativity and innovation. It's a must-play for any gaming enthusiast.",
      "I'm captivated by the atmosphere of this game. It's immersive, atmospheric, and utterly captivating.",
      "I'm hooked! This game has become my new obsession.",
      "The attention to detail in this game is second to none. It's clear the developers put a lot of thought into every aspect.",
      "This game is a work of art. Every aspect is meticulously crafted, from the visuals to the gameplay.",
      "I'm blown away by the depth and scope of this game. There's so much to discover and explore.",
      "This game is a masterpiece. It's a testament to the power of storytelling in gaming.",
    ];
    return reviews[Math.floor(Math.random() * reviews.length)];
  }

  // Function to create a new review card
  function createReviewCard() {
    const card = document.createElement("div");
    card.classList.add("review-card");

    // Populate name
    const name = document.createElement("h3");
    name.classList.add("review-name");
    const names = ["John", "Emma", "Michael", "Sophia", "William", "Olivia", "Lucy", "Peter", "Jack", "Suzy", "Marika", "Tulip", "Poppy", "Rose", "Sunny", "Skye", "Drake", "Billy", "Smaug", "Penny", "Baldur", "Loki", "Lumi", "Prancie", "Anne", "Blossom", "Isaac", "Natalie", "Ethan", "Chloe", "Aiden", "Mia", "Jacob", "Ella", "Elijah", "Charlotte", "Noah", "Amelia", "Logan", "Harper", "Mason", "Aria", "Carter", "Lily"];
    name.textContent = names[Math.floor(Math.random() * names.length)];
    card.appendChild(name);

    // Populate stars
    const starsContainer = document.createElement("div");
    starsContainer.classList.add("review-stars");
    const randomStars = generateRandomStars();
    for (let i = 0; i < randomStars; i++) {
      const starIcon = document.getElementById("star").cloneNode(true);
      starsContainer.appendChild(starIcon);
    }
    card.appendChild(starsContainer);

    // Populate icon
const iconPath = generateRandomIconPath();
const icon = document.createElement("img");
icon.setAttribute("src", iconPath);
icon.classList.add("review-icon");
const iconContainer = document.createElement("div");
iconContainer.appendChild(icon);
card.appendChild(iconContainer);

    // Populate review text
    const text = document.createElement("p");
    text.classList.add("review-text");
    text.textContent = generateRandomReviewText();
    card.appendChild(text);

    // Append the new review card to the container
    reviewCardsContainer.appendChild(card);
  }

  // Generate some initial review cards
  for (let i = 0; i < 3; i++) {
    createReviewCard();
  }

  // Event listener for the "Show More" button
  showMoreButton.addEventListener("click", function () {
    // Generate 3 more review cards
    for (let i = 0; i < 5; i++) {
      createReviewCard();
    }
  });
});
