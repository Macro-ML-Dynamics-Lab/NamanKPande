document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Carousel Logic ---------------- */
  const track = document.querySelector('.carousel-track');
  const items = track ? Array.from(track.children) : [];
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const carouselContainer = document.querySelector('.carousel-container');

  let currentIndex = 0;
  const itemsToShow = 2; 
  let autoSlide;

  function updateCarousel() {
    if (items.length === 0) return;
    // Calculate width dynamically to ensure correct sliding
    const itemWidth = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  if (nextButton && prevButton && track) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < items.length - itemsToShow) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - itemsToShow;
      updateCarousel();
    });

    function startAutoSlide() {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex < items.length - itemsToShow) ? currentIndex + 1 : 0;
        updateCarousel();
      }, 3000);
    }

    function stopAutoSlide() { clearInterval(autoSlide); }

    startAutoSlide();
    carouselContainer?.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer?.addEventListener('mouseleave', startAutoSlide);
  }

  /* ---------------- Image Overlay Logic ---------------- */
  const overlayBtns = document.querySelectorAll('.overlay');
  const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
  const fullscreenImg = fullscreenOverlay?.querySelector('img');

  overlayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Find the specific image in this carousel item
      const thumbnailImg = e.currentTarget.previousElementSibling;
      
      // Pull the "full" image from data-full; fall back to src if not found
      const fullSizePath = thumbnailImg.getAttribute('data-full') || thumbnailImg.src;
      
      if (fullscreenImg && fullscreenOverlay) {
        fullscreenImg.src = fullSizePath;
        fullscreenOverlay.style.display = 'flex';
      }
    });
  });

  fullscreenOverlay?.addEventListener('click', (e) => {
    // Close only if clicking the background, not the image itself
    if (e.target === fullscreenOverlay) {
      fullscreenOverlay.style.display = 'none';
    }
  });

  /* ---------------- Mobile Menu & Navigation ---------------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1080) {
          navLinks.classList.remove("open");
          hamburger.classList.remove("active");
        }
      });
    });
  }

  /* ---------------- Clickable Publication List ---------------- */
  const publicationItems = document.querySelectorAll('.education-section ol li[data-link]');
  publicationItems.forEach(li => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      const link = li.getAttribute('data-link');
      if (link) window.open(link, '_blank');
    });
  });
});