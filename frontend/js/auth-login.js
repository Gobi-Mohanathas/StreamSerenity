/*
Author: Gobi Mohanathas
File Name: auth-login.js
Date of Creation: January 13, 2025
Purpose: Handles client-side login by submitting credentials to the authentication API, 
         displays inline validation errors, and redirects user based on authorization
         role.
*/
import {API_BASE} from "./config.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorBox = document.getElementById('login-error');

    // Exit early if script is loaded on page with no login form
    if (!form) {
        return;
    }

    // Handle login form submission using async API request
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous error
        if (errorBox) {
            errorBox.textContent = '';
        }

        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();

        // Validate required fields before sending request
        if (!email || !password) {
            if (errorBox) {
                errorBox.textContent = 'Please enter both email and password.';
            }
            return;
        }

        try {
            // Send login credentials to backend authentication endpoint
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            // Handle authentication failure returned by backend
            if (!response.ok) {
                if (errorBox) {
                    errorBox.textContent = data.error || 'Invalid email or password.';
                }
                return;
            }

            // Redirect based on role
            if (data.role === 'admin') {
                window.location.href = '/pages/admin/index.html';
            } else {
                window.location.href = '/pages/index.html';
            }

        } catch (err) {
            // Handle network or server failures/issues
            console.error(err);
            if (errorBox) {
                errorBox.textContent = 'Unable to connect to server. Please try again.';
            }
        }
    });
});
