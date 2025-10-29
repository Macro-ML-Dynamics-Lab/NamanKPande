document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Carousel Logic ---------------- */
  const track = document.querySelector('.carousel-track');
  const items = track ? Array.from(track.children) : [];
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const carouselContainer = document.querySelector('.carousel-container');

  let currentIndex = 0;
  const itemsToShow = 2; // Number of visible items
  let autoSlide; // Interval reference

  function updateCarousel() {
    if (items.length === 0) return;
    const itemWidth = items[0].getBoundingClientRect().width + 20; // Include padding/margin
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  if (nextButton && prevButton && track) {
    nextButton.addEventListener('click', () => {
      if (currentIndex < items.length - itemsToShow) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = items.length - itemsToShow;
      }
      updateCarousel();
    });

    // Auto-slide every 3 seconds
    function startAutoSlide() {
      autoSlide = setInterval(() => {
        if (currentIndex < items.length - itemsToShow) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }, 3000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    startAutoSlide();

    // Pause auto-slide on hover
    carouselContainer?.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer?.addEventListener('mouseleave', startAutoSlide);
  }

  /* ---------------- Image Overlay Logic ---------------- */
  const overlayBtns = document.querySelectorAll('.overlay');
  const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
  const fullscreenImg = fullscreenOverlay ? fullscreenOverlay.querySelector('img') : null;

  overlayBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const imgSrc = e.currentTarget.previousElementSibling.src;
      // If you want to open a different image than shown in carousel:
      // const altImage = e.currentTarget.dataset.fullImage;
      fullscreenImg.src = imgSrc;
      fullscreenOverlay.style.display = 'flex';
    });
  });

  // Close overlay when clicking outside the image
  fullscreenOverlay?.addEventListener('click', e => {
    if (e.target === fullscreenOverlay) {
      fullscreenOverlay.style.display = 'none';
    }
  });

  /* ---------------- Mobile Menu Toggle ---------------- */
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');

  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuIcon.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('open');
      });
    });
  }

  /* ---------------- Clickable Publication List ---------------- */
  const publicationItems = document.querySelectorAll('.education-section ol li[data-link]');

  publicationItems.forEach(li => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      const link = li.getAttribute('data-link');
      if (link) {
        window.open(link, '_blank'); // open in a new tab
      }
    });
  });
});
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