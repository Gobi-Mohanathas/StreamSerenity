<?php
/**
 * Author: Gobi Mohanathas
 * File Name: login.php
 * Date of Creation: January 13, 2026
 * Purpose: API endpoint that validates user credentials sent as JSON, intializes session
 *          state upon success, and returns authentication results as JSON format.
 */

require __DIR__ . '/session.php';
require __DIR__ . '/../config/db.php';

require __DIR__ . '/../config/bootstrap.php';

header('Content-Type: application/json');

// Decode JSON request body into PHP associative array
$data = json_decode(file_get_contents('php://input'), true);

// Store posted email and password
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validate if required credentials are present and return JSON error on failure
if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing credentials']);
    exit;
}

// SQL statement to retrieve user's id, email, password and account type
$stmnt = $db->prepare("
SELECT user_id, email, user_password, user_type
FROM users
WHERE email = :email
");

// Execute prepared statement with bound email parameter
$stmnt->execute([':email' => $email]);
// Store user information in PHP associative array
$user = $stmnt->fetch();

// Handle authentication failure when user does not exist or credentials are invalid
if (!$user || $password !== $user['user_password']) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid Login: Please check credentials and try again']);
    exit;
}

// Set PHP session variables 
$_SESSION['user_id'] = $user['user_id'];
$_SESSION['user_type'] = $user['user_type'];

// Return JSON response indicating successful authentication and user role
echo json_encode([
    'success' => true,
    'role' => $user['user_type']
]);

