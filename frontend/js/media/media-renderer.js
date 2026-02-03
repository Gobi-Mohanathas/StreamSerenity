/**
 * Author: Gobi Mohanathas
 * File Name: media_renderer.js
 * Date of Creation: January 8, 2025
 * Purpose: 
 */
import { fetchMedia } from "./media-service.js";

document.addEventListener("DOMContentLoaded", async () => {

    const media = await fetchMedia();

    if (!media.length) {
        return;
    }

    const genreFilter = document.getElementById("filter-genre");
    const ratingFilter = document.getElementById("filter-rating");
    const durationFilter = document.getElementById("filter-duration");

    const rowStructure = {
        horror: item => item.genre === "Horror",
        action: item => item.genre === "Action",
        'most-watched': item => item.rating >= 8
    };

    function passesFilters(item) {
        if (genreFilter?.value && item.genre !== genreFilter.value) {
            return false;
        }

        if (ratingFilter?.value && item.rating < Number(ratingFilter.value)) {
            return false;
        }

        if (durationFilter?.value) {
            const mins = item.duration_minutes;

            if (durationFilter.value === "short" && mins >= 90) return false;
            if (durationFilter.value === "medium" && (mins < 90 || mins > 120)) return false;
            if (durationFilter.value === "long" && mins <= 120) return false;
        }

        return true;
    }

    function renderRows() {
        Object.entries(rowStructure).forEach(([rowKey, filterFn]) => {
            const row = document.querySelector(
                `.carousel-row[data-row="${rowKey}"]`
            );
            
            if (!row) {
                return;
            }

            row.innerHTML = "";

            media
                .filter(filterFn)
                .filter(passesFilters)
                .forEach(item => {
                    row.appendChild(createMediaCard(item));
                });
        });
    }


    [genreFilter, ratingFilter, durationFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener("change", renderRows);
        }
    });

    renderRows();
});


function createMediaCard(item) {
    const card = document.createElement("div");
    card.className = "media-card";

    card.innerHTML = `
        <div class="media-image">
            <img
                src="/images/${item.image_filename}"
                alt="${item.title}"
                loading="lazy"
            />
        </div>

        <div class="media-info">
            <h3 class="media-title">${item.title}</h3>

            <div class="media-meta">
                <span class="media-rating">⭐ ${item.rating}</span>
                <span class="media-duration">
                    ${formatDuration(item.duration_minutes)}
                </span>
            </div>
        </div>
    `;

    card.addEventListener("click", () => {
        window.location.href = "dummy_page.php";
    });

    return card;
}

function formatDuration(minutes) {
    if (!minutes && minutes !== 0){
        return "";
    };

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}