<?php
/**
 * Author: Gobi Mohanathas
 * File Name: signup.php
 * Date of Creation: December 26, 2025
 * Purpose: Sign-up page for visitors, giving their credentials to be stored into database and
 *          used for accessing and using the website
 */
// Includes and run db.php code
require "db.php";

// Check is sign up form was submitted
if (isset($_POST['sign_up'])) {

    // Use given information from sign up form and store the information
    $username = ($_POST['username']);
    $password = ($_POST['userpassword']);
    $firstName = ($_POST['firstname']);
    $lastName = ($_POST['lastname']);
    $email = ($_POST['email']);
    $userType = ($_POST['usertype']);

    // Check username exists
    $checkUser = $db->prepare("SELECT 1 FROM users WHERE username = :username LIMIT 1");
    $checkUser->bindParam(':username', $username);
    $checkUser->execute();
    $userExists = $checkUser->rowCount() > 0;

    // Check email exists
    $checkEmail = $db->prepare("SELECT 1 FROM users WHERE email = :email LIMIT 1");
    $checkEmail->bindParam(':email', $email);
    $checkEmail->execute();
    $emailExists = $checkEmail->rowCount() > 0;

    // Setting error message string for when user tries to sign up with existing username or email

    $errorMessage = '';
    if ($userExists && $emailExists) {
        $errorMessage = 'Both username and email already exist';
    } elseif ($userExists) {
        $errorMessage = 'Username already exists';
    } elseif ($emailExists) {
        $errorMessage = 'Email already exists';
    }

    // If there is an error message, then alert user with appropriate error message and redirect
    // to same page (reloading)
    if ($errorMessage !== '') {
        echo "<script>
                alert('{$errorMessage}');
                window.location.href = '{$_SERVER['PHP_SELF']}';
            </script>";
        exit;
    }
    
    // Statement to store into users table the sign-up user's username, password, first and last name, email, and
    // user type.
    $sql_statement = "INSERT INTO users (username, user_password, first_name, last_name, email, user_type)
                        VALUES (:username, :user_password, :first_name, :last_name, :email, :user_type)";
    
    $result = $db->prepare($sql_statement);

    $result->bindParam(':username', $username);
    $result->bindParam(':user_password', $password);
    $result->bindParam(':first_name', $firstName);
    $result->bindParam(':last_name', $lastName);
    $result->bindParam(':email', $email);
    $result->bindParam(':user_type', $userType);
    

    // If the execution of the statement is successful, alert the user the account was successfully
    // created, otherwise alert them that it was not
    if ($result->execute()) {
        echo "<script>alert('User created successfully'); window.location.href='login.php';</script>";
    }
    else {
        echo "<script>alert('User was not created successfully');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up | StreamSerenity</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Css/style.css">
    <script src="../scripts/signup.js" defer></script>
</head>
<body>

<div class="signup-screen">
    <header class="signup-header">
        <div class="signup-logo">STREAMSERENITY</div>
    </header>

    <main class="signup-card">
        <h1>Create Account</h1>

        <form name="sign-up-form" action="" method="post">
            <div class="signup-group">
                <label for="username">Username</label>
                <input id="username" name="username" type="text" placeholder="Enter username">
            </div>

            <div class="signup-group">
                <label for="userpassword">Password</label>
                <input id="userpassword" name="userpassword" type="password" placeholder="Enter password">
            </div>

            <div class="signup-group">
                <label for="firstname">First Name</label>
                <input id="firstname" name="firstname" type="text" placeholder="Enter first name">
            </div>

            <div class="signup-group">
                <label for="lastname">Last Name</label>
                <input id="lastname" name="lastname" type="text" placeholder="Enter last name">
            </div>

            <div class="signup-group">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Enter email">
            </div>

            <div class="signup-group">
                <label for="usertype">User Type</label>
                <select id="usertype" name="usertype">
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                </select>
            </div>

            <button type="submit" name="sign_up" class="signup-button">Sign Up</button>
        </form>

        <div class="signup-text">
            <span>Already have an account?</span>
            <a href="login.php" class="login-btn">Login</a>
        </div>
    </main>
</div>

</body>
</html>
