
<?php
/**
 * Author: Gobi Mohanathas
 * File Name: list.php
 * Date of Creation: January 8, 2026
 * Purpose: Returns media list as JSON
 */

require __DIR__ . '/../auth/session.php';
require __DIR__ . '/../config/db.php';


header('Content-Type: application/json');

// Enforce authentication
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$sql = "
    SELECT
        media_id,
        title,
        genre,
        rating,
        duration,
        image_filename,
        media_type
    FROM media_catalog
";

$stmt = $db->prepare($sql);
$stmt->execute();

$media = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if (!empty($row['duration'])) {
        [$h, $m] = explode(':', $row['duration']);
        $row['duration_minutes'] = ((int)$h * 60) + (int)$m;
    } else {
        $row['duration_minutes'] = null;
    }

    unset($row['duration']);
    $media[] = $row;
}

echo json_encode($media);

