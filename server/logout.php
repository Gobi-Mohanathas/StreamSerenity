<?php
/**
 * Author: Gobi Mohanathas
 * File Name: logout.php
 * Date of Creation: December 26, 2025
 * Purpose: Logout functionality file, that will remove user session elements 
 *          (stored variables, keys, values, etc.)
 */
session_start();

// Clear all session data
$_SESSION = [];
session_unset();
session_destroy();

// Redirect to login page and exit script
header("Location: Login.php");
exit();
