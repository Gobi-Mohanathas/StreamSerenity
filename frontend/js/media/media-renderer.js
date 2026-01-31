document.addEventListener("DOMContentLoaded", () => {
/**
 * Author: Gobi Mohanathas
 * File Name: media_renderer.js
 * Date of Creation: January 8, 2025
 * Purpose: 
 */
    
    // Stores reference to dropdown filters and media container
    const genreF = document.getElementById("genreFilter");
    const ratingF = document.getElementById("ratingFilter");
    const durationF = document.getElementById("durationFilter");

    const container = document.getElementById("mediaContainer");
    const cards = Array.from(document.querySelectorAll(".card")); // store original cards

    // Add click event listeners to each card for navigation to detail page
    cards.forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = "dummy_page.php";
        });
    });
    
    // Function to apply genre, rating, and duration filters to media cards and updates display
    function applyFilters() {

        // Store current filter values
        const g = genreF.value;
        const r = ratingF.value ? parseFloat(ratingF.value) : null;
        const d = durationF.value;

        // Process each card to determine if it should be visible or not
        cards.forEach(card => {
            let show = true;

            // Extract card data attributes for filtering
            const cardGenre = card.dataset.genre;
            const cardRating = parseFloat(card.dataset.rating);

            // Convert duration from "HH:MM:SS" format to total minutes for comparison
            const durationSegments = card.dataset.duration.split(':');
            const cardDuration = parseInt(durationSegments[0]) * 60 + parseInt(durationSegments[1]) + Math.round(parseInt(durationSegments[2])/60);

            // Apply genre filter, hide card if genre of card does not match genre filter
            if (g && g !== cardGenre) show = false;

            // Apply rating filter, hide card if rating of card does not match rating filter
            if (r !== null && cardRating < r) show = false;

            // Apply duration filter, hide card if duration of card does not match duration filter
            if (d === "15-30" && !(cardDuration >= 15 && cardDuration <= 30)) show = false;
            if (d === "30-60" && !(cardDuration > 30 && cardDuration <= 60)) show = false;
            if (d === "60-120" && !(cardDuration > 60 && cardDuration <= 120)) show = false;
            if (d === "120-180" && !(cardDuration > 120 && cardDuration <= 180)) show = false;
            if (d === "180+" && !(cardDuration > 180)) show = false;

            // Update visibility based on filter results
            card.style.display = show ? "flex" : "none";
        });

        // Sort card after filtering
        sortCards();
    }

    function sortCards() {
        // Only visible cards are sorted
        const visibleCards = cards.filter(c => c.style.display !== "none");

        // Sorts cards alphabetically
        visibleCards.sort((a,b) => a.dataset.title.localeCompare(b.dataset.title));

        // Append sorted cards to container for updates visual
        visibleCards.forEach(c => container.appendChild(c));
    }

    // Add event listeners to filter dropdowns to trigger filtering on change
    genreF.addEventListener("change", applyFilters);
    ratingF.addEventListener("change", applyFilters);
    durationF.addEventListener("change", applyFilters);
});
