document.addEventListener("DOMContentLoaded", () => {
  async function fetchData() {
    try {
      const response = await fetch("./data/data.json");
      if (!response.ok) throw new Error("Network response was not ok");
      const jsonData = await response.json();
      const container = document.getElementById("card-slider");
      jsonData.cardsTestimonials.forEach((card) => {
        container.appendChild(createCard(card));
      });

      showSlide(currentIndex); // Ensure the first slide is shown after cards are added
      initTouchEvents(); // Initialize touch events after cards are added
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  function createCard(card) {
    const cardElement = document.createElement("div");
    cardElement.className = "testimonials__card";

    // Create a container for the stars
    const starsContainer = document.createElement("div");
    starsContainer.className = "testimonials__card--stars";

    // Append the star icons based on the rating
    for (let i = 0; i < card.rating; i++) {
      const starImg = document.createElement("img");
      starImg.src = card.star;
      starImg.alt = `Star ${i + 1}`;
      starsContainer.appendChild(starImg);
    }

    cardElement.innerHTML = `
      <div class="testimonials__card--img">
        <img src="${card.user_img}" alt="${card.name}" />
      </div>
      <svg class="quots" width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <path d="M10.4444 0C3.33333 6.88889 0 14.2222 0 20.7778C0 26.1111 4 30 8 30C11.5556 30 14.4444 27.1111 14.4444 23.5556C14.4444 19 11.1111 16.6667 6.22222 16.6667C6.22222 11.2222 7.88889 8 13.1111 2.66667L10.4444 0ZM29 0C21.8889 6.88889 18.5556 14.2222 18.5556 20.7778C18.5556 26.1111 22.5556 30 26.5556 30C30.1111 30 33 27.1111 33 23.5556C33 19 29.6667 16.6667 24.7778 16.6667C24.7778 11.2222 26.4444 8 31.6667 2.66667L29 0Z" fill="#8447FF" /> 
      </svg>
      <div class="testimonials__card--container">
        <div class="testimonials__card--title">
          <h3 class="User--name">${card.name}</h3>
          <h4 class="user--mail">${card.username}</h4>
        </div>
        <p class="user--comment">${card.comment}</p>
      </div>
    `;

    // Append the stars container to the card element
    cardElement
      .querySelector(".testimonials__card--container")
      .appendChild(starsContainer);

    return cardElement;
  }

  let currentIndex = 0;

  function showSlide(index) {
    const slider = document.querySelector(".card-slider");
    const totalCards = slider.children.length;

    // Determine number of cards to show based on screen width
    const width = window.innerWidth;
    const cardsToShow = width <= 375 ? 1 : width <= 768 ? 1 : 4; // Adjust based on your existing conditions

    // Calculate card width including margins
    const cardWidth =
      slider.children[0].offsetWidth +
      parseFloat(getComputedStyle(slider.children[0]).marginLeft) +
      parseFloat(getComputedStyle(slider.children[0]).marginRight);

    const maxIndex = Math.ceil(totalCards / cardsToShow) - 1;

    if (index < 0) {
      currentIndex = maxIndex;
    } else if (index > maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // Touch event handling
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function initTouchEvents() {
    const slider = document.querySelector(".card-slider");

    slider.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener("touchmove", (event) => {
      if (!isDragging) return;
      currentX = event.touches[0].clientX;
      const deltaX = currentX - startX;
      slider.style.transform = `translateX(calc(-${
        currentIndex *
        (slider.children[0].offsetWidth +
          parseFloat(getComputedStyle(slider.children[0]).marginLeft) +
          parseFloat(getComputedStyle(slider.children[0]).marginRight))
      }px + ${deltaX}px))`;
    });

    slider.addEventListener("touchend", () => {
      if (!isDragging) return;
      const deltaX = currentX - startX;
      const threshold = slider.offsetWidth / 3; // Adjust threshold for swipe sensitivity
      if (deltaX > threshold) {
        prevSlide();
      } else if (deltaX < -threshold) {
        nextSlide();
      } else {
        showSlide(currentIndex);
      }
      isDragging = false;
    });
  }

  fetchData();

  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
});
