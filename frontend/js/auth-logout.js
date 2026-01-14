/*
Author: Gobi Mohanathas
File Name: auth-logout.js
Date of Creation: January 13, 2026
Purpose: Handles client-side logout by calling the backend logout API,
         clearing the user session, and redirecting the user to the
         login page.
*/

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
            await fetch('/StreamSerenity/backend/auth/logout.php', {
                method: 'POST'
            });

            // Redirect user to login page after successful logout
            window.location.href = '/StreamSerenity/frontend/pages/login.html';

        } catch (err) {
            // Handle network or server failures/issues
            console.error(err);
            alert('Logout failed. Please try again.');
        }
    });
});
