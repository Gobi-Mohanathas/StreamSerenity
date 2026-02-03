<?php
/**
 * Author: Gobi Mohanathas
 * File Name: require-auth.php
 * Date of Creation: January 13, 2026
 * Purpose: API endpoint that checks if user is currently authenticated by
 *          validating the active PHP session and returning authentication
 *          status as JSON.
 */
require __DIR__ . '/session.php';

header('Content-Type: application/json');

// If no authenticated user session exists, return unauthorized response
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
    exit;
}

// Return JSON response indicating authenticated session and user role
echo json_encode([
    'authenticated' => true,
    'role' => $_SESSION['user_type']
]);
