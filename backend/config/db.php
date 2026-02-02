<?php
/**
 * Author: Gobi Mohanathas
 * File Name: db.php
 * Date of Creation: January 13, 2026
 * Purpose: Database configuration file allowing connection to StreamingDB database on
 *          PostgreSQL via PDO.
 */

// Check to see if .env file exists and prepares database information
if (file_exists(__DIR__ . '/../.env')) {
    foreach (file(__DIR__ . '/../.env') as $line) {
        if (strpos(trim($line), '#') === 0 || !str_contains($line, '=')){
            continue;
        }
        [$key, $value] = array_map('trim', explode('=', $line, 2));
        putenv("$key=$value");
    }
}
// Database host
$host = getenv('DB_HOST');
// Database port
$port = getenv('DB_PORT') ?: 5432;
// Database name
$dbname = getenv('DB_NAME');
// Database user
$user = getenv('DB_USER');
// Database password
$password = getenv('DB_PASSWORD');

// Storing information for which database, where and what name
$dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";

// Attempt to create PDO object using above information and setting the error attribute to throw
// exceptions, if unsuccessful then stop script and display error message.
try {
    $db = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
}
catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}