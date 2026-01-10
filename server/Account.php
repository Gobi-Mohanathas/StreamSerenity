<?php
/**
 * Author: Gobi Mohanathas
 * File Name: home_link.php
 * Date of Creation: January 5, 2025
 * Purpose: Users account page to view users membership information as well as email. Also leads
 *          to edit account page.
 */
// Include and run code from auth_logged_in.php
require "auth_logged_in.php";

// Include and run code from home_link.php
require "home_link.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Account | StreamSerenity</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Css/style.css">
</head>
<body>

<header class="navbar">
    <div class="nav-left">
        <div class="logo">STREAMSERENITY</div>
        <ul class="nav-links">
            <li><a href="<?= $homeLink ?>">Home</a></li>
            <li><a href="movies.php">Movies</a></li>
            <li><a href="tv-show.php">TV Shows</a></li>
            <li><a href="Account.php">Account</a></li>
            <!-- Check to see if current user is of type admin to display admin tool option in nav bar -->
            <?php if ($_SESSION['user_type'] === 'admin') : ?>
                <li><a href="admin_dashboard.php">Admin Tool</a></li>
            <?php endif;?>
        </ul>
    </div>
    <div class="nav-right">
        <a href="Logout.php">Logout</a>
    </div>
</header>

<div class="page-wrapper">

    <section class="account-container">

        <!-- LEFT: TEXT DETAILS -->
        <div class="account-details">
            <h1>Account</h1>

            <div class="account-field">
                <span class="label">Email:</span>
                <!-- Display email for user in current session  -->
                <span><?= htmlspecialchars($_SESSION['email']) ?></span>
            </div>

            <div class="account-field">
                <span class="label">Plan:</span>
                <!-- Display user type for user in current session-->
                <span><?= htmlspecialchars($_SESSION['user_type']) ?></span>
            </div>

            <div class="account-actions">
                <a href="edit-account.php">Edit Account Details</a>
            </div>

        </div>

        <!-- RIGHT: PROFILE IMAGE -->
        <div class="account-image">
            <img src="../Images/bachira pfp.jpg" alt="Profile Image">
        </div>

    </section>

</div>

</body>
</html>
