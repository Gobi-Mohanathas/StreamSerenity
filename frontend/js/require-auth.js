/*
Author: Gobi Mohanathas
File Name: require-auth.js
Date of Creation: January 13, 2026
Purpose: Protects authenticated pages by verifying an active user session
         through the authentication status API and enforcing role-based
         access control where required.
*/

import { API_BASE } from "./config.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Request authentication status from backend
        const response = await fetch(`${API_BASE}/auth/require-auth`, {
            credentials: "include" // 
        });

        const data = await response.json();

        // Redirect unauthenticated users to login page
        if (!response.ok || !data.authenticated) {
            window.location.href = '/pages/login.html';
            return;
        }

        // Enforce admin-only access for admin pages
        const isAdminPage = window.location.pathname.includes('/admin/');
        if (isAdminPage && data.role !== 'admin') {
            window.location.href = '/pages/index.html';
        }

    } catch (err) {
        // Handle network or server failures/issues
        console.error(err);
        window.location.href = '/pages/login.html';
    }
});
