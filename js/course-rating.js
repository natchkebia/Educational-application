document.addEventListener("DOMContentLoaded", () => {
  // Fetch and process data from the JSON file
  async function fetchData() {
    try {
      const response = await fetch("../data/data.json");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      // Process ratings and update the rating summary
      processRatings(data);

      // Display testimonials
      displayTestimonials(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Process ratings for a specific course and update the DOM
  function processRatings(data) {
    const courseTitle = "თამაშების დეველოპმენტი";
    const filteredTestimonials = data.cardsTestimonials.filter(
      (testimonial) => testimonial.title === courseTitle
    );

    const commentCount = filteredTestimonials.length;
    const ratingCount = filteredTestimonials.reduce((acc, testimonial) => {
      acc[testimonial.rating] = (acc[testimonial.rating] || 0) + 1;
      return acc;
    }, {});

    const totalRatings = Object.values(ratingCount).reduce(
      (sum, count) => sum + count,
      0
    );
    const ratingPercentage = {};

    for (let i = 1; i <= 5; i++) {
      ratingPercentage[i] = (
        ((ratingCount[i] || 0) / totalRatings) *
        100
      ).toFixed(2);
    }

    const totalRatingSum = filteredTestimonials.reduce(
      (sum, testimonial) => sum + testimonial.rating,
      0
    );
    const averageRating = commentCount ? totalRatingSum / commentCount : 0;

    document.querySelector(".rating__diagram--course-rating").textContent =
      averageRating.toFixed(1);
    document.querySelector(".rating__diagram--count span").textContent =
      commentCount;

    for (let i = 5; i >= 1; i--) {
      const progressBar = document.querySelector(
        `.rating__diagram__stars .rating__wrapper:nth-child(${
          6 - i
        }) .rating__progress--bar`
      );
      const progressValue = document.querySelector(
        `.rating__diagram__stars .rating__wrapper:nth-child(${
          6 - i
        }) .rating__progress--value span`
      );

      if (progressBar && progressValue) {
        progressBar.style.width = `${ratingPercentage[i]}%`;
        progressValue.textContent = `${ratingPercentage[i]}%`;
      }
    }
  }

  // Display testimonial cards
  function displayTestimonials(data) {
    const container = document.getElementById("testimonials");
    const numberOfCardsToShow = 3;
    const cards = data.cardsTestimonials.slice(0, numberOfCardsToShow);

    cards.forEach((card) => {
      container.appendChild(createCard(card));
    });
  }

  // Create a testimonial card element
 function createCard(card) {
   const cardElement = document.createElement("div");
   cardElement.className = "testimonials__card";

   const starsContainer = document.createElement("div");
   starsContainer.className = "testimonials__card--stars";

   // Adjust star image paths
   const adjustedStarPath = (path) => `../${path}`;

   for (let i = 0; i < card.rating; i++) {
     const starImg = document.createElement("img");
     starImg.src = adjustedStarPath(card.star); // Adjust the path
     starImg.alt = `Star ${i + 1}`;
     starsContainer.appendChild(starImg);
   }

   cardElement.innerHTML = `
    <div class="testimonials__card--img">
      <img src="${adjustedStarPath(card.user_img)}" alt="${card.name}" />
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

   cardElement
     .querySelector(".testimonials__card--container")
     .appendChild(starsContainer);
   return cardElement;
 }

  fetchData();
});
