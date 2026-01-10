<?php
/**
 * Author: Gobi Mohanathas
 * File Name: home_link.php
 * Date of Creation: December 28, 2025
 * Purpose: Apply DRY methodolgy to home link variable, which will take user to appropriate homepage.
 */
// Assigning appropraite homepage depending on current session users' type.
switch ($_SESSION['user_type']) {
    case 'admin':
        $homeLink = 'admin_index.php';
        break;
    case 'premium':
        $homeLink = 'index.php';
        break;
    case 'regular':
    default:
        $homeLink = 'index.php';
        break;
}
