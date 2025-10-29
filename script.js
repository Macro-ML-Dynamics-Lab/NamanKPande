/* ---------------- Carousel Logic ---------------- */
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
const itemsToShow = 2; // Number of items visible at a time

// Function to update carousel position
function updateCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width + 20; // include padding or margin
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Next button click
nextButton.addEventListener('click', () => {
  if (currentIndex < items.length - itemsToShow) {
    currentIndex++;
    updateCarousel();
  }
});

// Prev button click
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Optional: Automatic slide every 3 seconds
setInterval(() => {
  if (currentIndex < items.length - itemsToShow) {
    currentIndex++;
  } else {
    currentIndex = 0; // loop back to start
  }
  updateCarousel();
}, 3000);


/* ---------------- Mobile Menu Toggle ---------------- */
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('open');
  });
}

/* Optional: Close menu when a link is clicked (for better UX on Android) */
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('open');
    }
  });
});
