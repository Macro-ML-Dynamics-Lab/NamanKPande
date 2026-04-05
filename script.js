document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Carousel Logic ---------------- */
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;
    // For desktop, itemsToShow is 2, for mobile this needs to be adjusted in CSS/JS
    const itemsToShow = 2; 

    // Function to update carousel position
    function updateCarousel() {
        // Calculate item width including the 5px padding on both sides (10px total)
        // Note: You should check for the window size here for full responsiveness
        const itemWidth = items[0].getBoundingClientRect().width + 10; 
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Next button click
    nextButton.addEventListener('click', () => {
        // Check current screen width to determine the correct max index
        const actualItemsToShow = window.innerWidth <= 600 ? 1 : itemsToShow; 

        if (currentIndex < items.length - actualItemsToShow) {
            currentIndex++;
            updateCarousel();
        } else if (currentIndex >= items.length - actualItemsToShow) {
             currentIndex = 0; // Loop back to start if at the end
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

    // Handle initial load and window resize for carousel itemsToShow and position
    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Initial call to set correct position

    // Optional: Automatic slide every 3 seconds
    setInterval(() => {
        const actualItemsToShow = window.innerWidth <= 600 ? 1 : itemsToShow;

        if (currentIndex < items.length - actualItemsToShow) {
            currentIndex++;
        } else {
            currentIndex = 0; // loop back to start
        }
        updateCarousel();
    }, 3000);


    /* ---------------- Mobile Menu Toggle (Hamburger Logic) ---------------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Toggle the 'open' class when the hamburger button is clicked
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        
        // OPTIONAL: Close the menu when a link is clicked (UX improvement)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Only close the menu if we are in mobile size (<= 600px)
                if (window.innerWidth <= 600) {
                    navLinks.classList.remove('open');
                }
            });
        });
    }
});