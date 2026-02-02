<?php
require_once __DIR__ . '/../config/bootstrap.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$path = substr($uri, strlen('/auth'));

switch ($path) {

    case '':
    case '/':
        echo json_encode([
            'message' => 'Auth API'
        ]);
        break;

    case '/require-auth':
        require __DIR__ . '/require-auth.php';
        break;

    case '/login':
        require __DIR__ . '/login.php';
        break;

    case '/logout':
        require __DIR__ . '/logout.php';
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Auth route not found']);
}
