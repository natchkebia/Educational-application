// processRatings.js

// Fetch the data from data.json
fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Filter the testimonials for the course "თამაშების დეველოპმენტი"
    const courseTitle = "თამაშების დეველოპმენტი";
    const filteredTestimonials = data.cardsTestimonials.filter(
      (testimonial) => testimonial.title === courseTitle
    );

    // Count the number of comments
    const commentCount = filteredTestimonials.length;

    // Count the number of ratings for each star level
    const ratingCount = filteredTestimonials.reduce((acc, testimonial) => {
      const rating = testimonial.rating;
      if (acc[rating]) {
        acc[rating] += 1;
      } else {
        acc[rating] = 1;
      }
      return acc;
    }, {});

    // Calculate the total number of ratings
    const totalRatings = Object.values(ratingCount).reduce(
      (sum, count) => sum + count,
      0
    );

    // Calculate the percentage for each rating level
    const ratingPercentage = {};
    for (let i = 1; i <= 5; i++) {
      ratingPercentage[i] = (
        ((ratingCount[i] || 0) / totalRatings) *
        100
      ).toFixed(2);
    }

    // Summarize the overall rating
    const totalRatingSum = filteredTestimonials.reduce(
      (sum, testimonial) => sum + testimonial.rating,
      0
    );
    const averageRating = totalRatingSum / commentCount;

    // Update the rating summary section
    document.querySelector(".rating__diagram--course-rating").textContent =
      averageRating.toFixed(1);
    document.querySelector(".rating__diagram--count span").textContent =
      commentCount;

    // Update the star rating percentages
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

      progressBar.style.width = `${ratingPercentage[i]}%`;
      progressValue.textContent = `${ratingPercentage[i]}%`;
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
