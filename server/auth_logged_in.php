<?php
/**
 * Author: Gobi Mohanathas
 * File Name: auth_logged_in.php
 * Date of Creation: December 28, 2025
 * Purpose: Session authentication file which handles if there is an active user session
 */

// Create or resume session
session_start();

// If certain session details were not set, then redirect user to login page and exit script
if (!isset($_SESSION['email']) && !isset($_SESSION['user_type']) && !isset($_SESSION['user_id'])) {
    header("Location: ../server/Login.php");
    exit();
}
