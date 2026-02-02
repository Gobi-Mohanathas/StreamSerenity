<?php
/**
 * Author: Gobi Mohanathas
 * File Name: genres.php
 * Date of Creation: January 31, 2026
 * Purpose: Returns distinct media genres found in database
 */
require __DIR__ . '/../backend/config/db.php';

$stmt = $db->query("SELECT DISTINCT genre FROM media_catalog ORDER BY genre");
$genres = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($genres);
