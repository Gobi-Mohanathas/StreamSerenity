<?php
/**
 * Author: Gobi Mohanathas
 * File Name: edit_account.php
 * Date of Creation: January 5, 2025
 * Purpose: Edit account page to allow user to change their email, username, and/or password
 */

// Include and run db.php
require "db.php";

// Include and run auth_logged_in.php
require "auth_logged_in.php";

// Include and run home_link.php
require "home_link.php";

// Check to see if edit account form was submitted
if (isset($_POST['save_changes'])) {

    // Store information from form about requested change to email, username, and password with 
    // confirmation and the users id
    $email = ($_POST['email']);
    $username = ($_POST['username']);
    $password = ($_POST['password']);
    $confirmPassword = ($_POST['confirm-password']);
    $userID = $_SESSION['user_id'];

    // If email is not empty, then update the email of the current user with requested email
    if (!empty($email)) {
        $email_statement = $db->prepare("UPDATE users SET email = :email WHERE user_id = :user_id");
        $email_statement->bindParam(':email', $email);
        $email_statement->bindParam(':user_id', $userID);
        $email_statement->execute();
    }

    // If username is not empty, then update the username of the current user with requested username
    if (!empty($username)) {
        $username_statement = $db->prepare("UPDATE users SET username = :username WHERE user_id = :user_id");
        $username_statement->bindParam(':username', $username);
        $username_statement->bindParam(':user_id', $userID);
        $username_statement->execute();
    }

    // If password is not empty, then update the password of the current user with requested password
    if (!empty($password)) {
        $password_statement = $db->prepare("UPDATE users SET user_password = :user_password WHERE user_id = :user_id");
        $password_statement->bindParam(':user_password', $password);
        $password_statement->bindParam(':user_id', $userID);
        $password_statement->execute();
    }

    // After all updates, refresh the session data
    $fetch_user = $db->prepare("SELECT email, username FROM users WHERE user_id = :user_id");
    $fetch_user->bindParam(':user_id', $userID);
    $fetch_user->execute();
    $user = $fetch_user->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $_SESSION['email'] = $user['email'];
        $_SESSION['username'] = $user['username'];
    }

    // Alert user that changes were sucessfuly made
    echo "<script>alert('Changes saved successfully');</script>";
}



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Account | StreamSerenity</title>
    <link rel="stylesheet" href="../Css/style.css">
    <script src="../scripts/edit_account.js" defer></script>
</head>

<header class="navbar">
    <div class="nav-left">
        <div class="logo">STREAMSERENITY</div>
        <ul class="nav-links">
            <li><a href="<?= $homeLink ?>">Home</a></li>
            <li><a href="movies.php">Movies</a></li>
            <li><a href="tv-show.php">TV Shows</a></li>
            <li><a href="Account.php">Account</a></li>
            <?php if ($_SESSION['user_type'] === 'admin') : ?>
                <li><a href="admin_dashboard.php">Admin Tool</a></li>
            <?php endif;?>
        </ul>
    </div>

    

    <div class="nav-right">
        <a href="Logout.php">Logout</a>
    </div>
</header>

<body>
    <div class="edit-account-container">
        <h1>Edit Account Details</h1>
        <hr>

        <form name="edit-account-form" action="" method="post">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="text" class="form-control" name="email" id="email" placeholder="Enter new email">
            </div>

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" name="username" id="username" placeholder="Enter new username">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Enter new password">
            </div>

            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" class="form-control" name="confirm-password" id="confirm-password" placeholder="Re-type password">
            </div>

            <div class="button-group">
                <button type="submit" name="save_changes" id="save_changes" class="button-primary">Save Changes</button>
            </div>
        </form>
    </div>
</body>
</html>
