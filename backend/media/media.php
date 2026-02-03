<?php
/**
 * Author: Gobi Mohanathas
 * File Name: media.php
 * Date of Creation: February 2, 2026
 * Purpose: Acts as the media API router, dispatching incoming media-related
 *          requests to the appropriate endpoint handlers (e.g., listing
 *          media content) based on the requested URI path.
 */
require_once __DIR__ . '/../config/bootstrap.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = substr($uri, strlen('/media'));

switch ($path) {
    case '':
    case '/':
        echo json_encode(['message' => 'Media API']);
        break;

    case '/list':
        require __DIR__ . '/list.php';
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Media route not found']);
}
