// testimonial

let slide = document.querySelector(".testimonials__container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let testimonialsCurrentINdex = 0;

function updateSlide() {
  let offset = -testimonialsCurrentINdex * (270 + 24);
  slide.computedStyleMap.transform = `translateX(${offset}px)`;
}

nextButton.addEventListener("moveSlide", () => {
  testimonialsCurrentINdex++;
  if (testimonialsCurrentINdex > slide.children.length - 4) {
    testimonialsCurrentINdex = 0;
  }
  updateSlide();
});

prevButton.addEventListener("moveSlide", () => {
  testimonialsCurrentINdex--;
  if (testimonialsCurrentINdex < 0) {
    testimonialsCurrentINdex = slide.children.length - 3;
  }
  updateSlide();
});
