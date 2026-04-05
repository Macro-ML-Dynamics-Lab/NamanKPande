document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- Carousel Logic ---------------- */
  const track = document.querySelector(".carousel-track");
  const items = track ? Array.from(track.children) : [];
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  const itemsToShow = 2;

  function updateCarousel() {
    if (!items.length) return;
    const itemWidth = items[0].getBoundingClientRect().width + 10;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  if (nextButton && prevButton && track) {
    nextButton.addEventListener("click", () => {
      const visibleItems = window.innerWidth <= 600 ? 1 : itemsToShow;
      currentIndex =
        currentIndex < items.length - visibleItems ? currentIndex + 1 : 0;
      updateCarousel();
    });

    prevButton.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();

    // Auto-slide
    setInterval(() => {
      const visibleItems = window.innerWidth <= 600 ? 1 : itemsToShow;
      currentIndex =
        currentIndex < items.length - visibleItems ? currentIndex + 1 : 0;
      updateCarousel();
    }, 3000);
  }

  /* ---------------- Hamburger Menu Toggle ---------------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    });

    // Close menu when a link is clicked (for better mobile UX)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1080) {
          navLinks.classList.remove("open");
          hamburger.classList.remove("active");
        }
      });
    });
  }
});
