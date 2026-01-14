<?php
/**
 * Author: Gobi Mohanathas
 * File Name: login.php
 * Date of Creation: January 13, 2026
 * Purpose: Initializes or resumes PHP sessions across authentication
 *          and protected API endpoints.
 */

// Check session status and start session if no session in progress
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
