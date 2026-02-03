<?php
require_once __DIR__ . '/../config/bootstrap.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/bootstrap.php';

header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch (true) {
    case str_starts_with($uri, '/auth'):
        require __DIR__ . '/../auth/auth.php';
        break;

    case str_starts_with($uri, '/media'):
        require __DIR__ . '/../media/media.php';
        break;

    case str_starts_with($uri, '/user'):
        require __DIR__ . '/../user/user.php';
        break;

    default:
        http_response_code(200);
        echo json_encode([
            "status" => "ok",
            "message" => "API is live (WIP)"
        ]);
        break;
}
