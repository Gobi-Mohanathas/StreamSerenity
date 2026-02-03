/*
Author: Gobi Mohanathas
File Name: auth-logout.js
Date of Creation: January 13, 2026
Purpose: Handles client-side logout by calling the backend logout API,
         clearing the user session, and redirecting the user to the
         login page.
*/
import { API_BASE } from "./config.js";

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('[data-logout]');

    // Exit early if no logout trigger exists on the page
    if (!logoutButton) {
        return;
    }

    // Handle logout action when user clicks logout button
    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            // Call backend logout endpoint to destroy session
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'POST',
                credentials: "include"
            });

            // Redirect user to login page after successful logout
            window.location.href = "/pages/login.html";

        } catch (err) {
            // Handle network or server failures/issues
            console.error("Logout failed:", err);
            alert('Logout failed. Please try again.');
        }
    });
});
