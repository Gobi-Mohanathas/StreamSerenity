/**
 * Author: Gobi Mohanathas
 * File Name: carousel.js
 * Date of Creation: January 8, 2025
 * Purpose: 
 */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-wrapper').forEach(carousel => {
        const track = carousel.querySelector('.carousel-row');
        const leftBtn = carousel.querySelector('.carousel-btn.left');
        const rightBtn = carousel.querySelector('.carousel-btn.right');

        if (!track || !leftBtn || !rightBtn) {
            return;
        }

        const scrollAmount = track.clientWidth * 0.9;

        rightBtn.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.clientWidth;

            if (track.scrollLeft >= maxScroll - 5) {
                track.scrollTo({left: 0, behavior: "smooth"});
            } else {
                track.scrollBy({left: scrollAmount, behavior: 'smooth'});
            }
        });

        leftBtn.addEventListener('click', () => {
            if (track.scrollLeft <= 5) {
                track.scrollTo({left: scrollWidth, behavior: "smooth"});
            } else {
                track.scrollBy({left: -scrollAmount, behavior: 'smooth'});
            }
        });
    });
});