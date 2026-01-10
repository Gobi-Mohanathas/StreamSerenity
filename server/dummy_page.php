<?php
/**
 * Author: Gobi Mohanathas
 * File Name: logout.php
 * Date of Creation: January 7, 2025
 * Purpose: Dummy page to redirect user from clicking on a media. Redirect action is to simulate 
 *          real life environment of being brought to actual media.
 */

// Include and run auth_logged_in.php
require "auth_logged_in.php";

// Include and run home_link.php
require "home_link.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dummy Content Page</title>
    <link rel="stylesheet" href="../Css/style.css">
</head>
<body>
    <div class="dummy-container">
        <a href="<?= $homeLink ?>">
            <img src="../Images/bachira pfp.jpg" alt="Selected Content" class="dummy-image">
        </a>
        <p class="dummy-text">This would be the page if user selects it.</p>
    </div>
</body>
</html>
