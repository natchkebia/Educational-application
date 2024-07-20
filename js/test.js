// script.js
document.addEventListener("DOMContentLoaded", () => {
  async function fetchData() {
    try {
      const response = await fetch("./data/data.json");
      if (!response.ok) throw new Error("Network response was not ok");
      const jsonData = await response.json();
      const container = document.getElementById("card-slider");
      jsonData.cards.forEach((card) => {
        container.appendChild(createCard(card));
      });
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  function createCard(card) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";

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
    const maxIndex = Math.ceil(totalCards / 4) - 1;

    if (index < 0) {
      currentIndex = 0;
    } else if (index > maxIndex) {
      currentIndex = maxIndex;
    } else {
      currentIndex = index;
    }

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  fetchData().then(() => {
    showSlide(currentIndex);
  });

  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
});
