<?php
/**
 * Author: Gobi Mohanathas
 * File Name: login.php
 * Date of Creation: December 26, 2025
 * Purpose: Login page for users to access StreamFlex, website. Handles creating sessions for the
 *          user as they login with their credentials, which presist through website navigation
 *          and handles feature controls. Additionally redirects user to appropriate website landing
 *          page.
 */

// Create or resume session for user, allowing access to user information upon website traversal.
session_start();

// Includes and run db.php code
require "db.php";

// Variable to store error message
$error = '';

// Check if login form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Storing users given email information
    $email = $_POST['email'] ?? '';

    // Storing users given password information 
    $password = $_POST['password'] ?? '';

    // Store sql statement for retreiving information about the user based on given email
    $sql_statement = $db->prepare("SELECT user_id, email, user_password, user_type FROM users WHERE email = :email");

    // Bind given email to email placeholder in sql statment
    $sql_statement->bindParam(':email', $email);
    
    // Execute the sql statement
    $sql_statement->execute();

    // Store information of user in associative array
    $user = $sql_statement->fetch(PDO::FETCH_ASSOC);

    // If user exists and user passwords are a match store, users information in session global 
    // array and also handle rerouting user to homepage. If no match, then store an error message
    if ($user && $password === $user['user_password']) {

        // Storing user id, email and user type for session use
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['user_type'] = $user['user_type'];

        // Admin redirect to admin landing page
        if ($user['user_type'] === 'admin') {
            header("Location: admin_index.php");
            exit();
        } else {
            header("Location: index.php");
            exit();
        }
    } else {
        // Setting error message
        $error = "Invalid email and/or password";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login | StreamSerenity</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Css/style.css">
</head>
<body>

<div class="center-screen">
    <header class="login-header">
        <div class="logo">STREAMSERENITY</div>
    </header>

    <main class="login-card">
        <h1>Sign In</h1>

        <!-- Handles showing error message in the case of error message string not being empty. -->
        <?php if (!empty($error)) : ?>
            <p class="error-message"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>

        <form action="" method="post">
            <div class="form-group">
                <label for="email">Email address</label>
                <input id="email" name="email" type="text" placeholder="Enter email">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Enter password">
            </div>

            <button type="submit" class="button-primary">Login</button>
        </form>

        <div class="signup-text">
            <span>Do not have an account?</span>
            <a href="signup.php" class="signup-btn">Sign Up</a>
        </div>
    </main>
</div>

</body>
</html>
