<?php
/**
 * Author: Gobi Mohanathas
 * File Name: logout.php
 * Date of Creation: January 13, 2026
 * Purpose: API endpoint that logs out the authenticated user by clearing
 *          session data and destroying the session.
 */

require __DIR__ . '/session.php';

// Clear all session variables
$_SESSION = [];

// Destroy the session on the server
session_destroy();

// Return HTTP 204 (No content) to indicate successful logout 
http_response_code(204);