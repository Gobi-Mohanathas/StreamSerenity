<?php
/**
 * Author: Gobi Mohanathas
 * File Name: logout.php
 * Date of Creation: January 13, 2026
 * Purpose: API endpoint that logs out the authenticated user by clearing
 *          session data and destroying the session.
 */

require __DIR__ . '/session.php';
require __DIR__ . '/../config/bootstrap.php';

header('Content-Type: application/json');

// Clear all session variables
$_SESSION = [];

// Delete the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params['path'],
        $params['domain'] ?? '',
        $params['secure'],
        $params['httponly']
    );
}

// Destroy the session on the server
session_destroy();

// Return confirmation
echo json_encode(['success' => true]);