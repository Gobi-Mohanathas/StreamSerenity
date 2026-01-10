<?php
/**
 * Author: Gobi Mohanathas
 * File Name: movies.php
 * Date of Creation: January 2, 2025
 * Purpose: Page to show only movies found within the database for the user
 */

// Include and run db.php
require "db.php";

// Include and run auth_logged_in.php
require "auth_logged_in.php";

// Include and run home_link.php
require "home_link.php";

// Store whether user is admin/premium or not
$isPremium = $_SESSION['user_type'] === 'premium' || $_SESSION['user_type'] === 'admin';

// SQL statement to select all media from media catalog
$sql_statement = "SELECT * FROM media_catalog";

// Store information based on query
$result = $db->query($sql_statement);

$mediaArray = [];

// While there is row in result
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    // If the user is not premium or admin and media is premium, then continue
    if (!$isPremium && $row['is_premium'] == 1) {
        continue;
    }
    // If media type is not movie then continue
    if ($row['media_type'] !== "movie") {
        continue;
    }

    // Add media to the  media array
    $mediaArray[] = $row;
}


$genreArray = [];

// Create unique list of genres and store information in genre array
foreach($mediaArray as $media) {
    if (!in_array($media['genre'], $genreArray)) {
        $genreArray[] = $media['genre'];
    }
}

// Sort the genres in alphabetical order
sort($genreArray);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Movies | StreamSerenity</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Css/style.css">
    <script src="../scripts/media_render.js" defer></script>
</head>
<body>

<header class="navbar">
    <div class="nav-left">
        <div class="logo">STREAMSERENITY</div>
        <ul class="nav-links">
            <li><a href="<?= $homeLink ?>">Home</a></li>
            <li><a href="movies.php">Movies</a></li>
            <li><a href="tv-show.php">TV Shows</a></li>
            <li><a href="Account.php">Account</a></li>
            <?php if ($_SESSION['user_type'] === 'admin') : ?>
                <li><a href="admin_dashboard.php">Admin Tool</a></li>
            <?php endif;?>
        </ul>
    </div>
    
    <div class="nav-right">
        <a href="Logout.php">Logout</a>
    </div>
</header>

<section>
    <h2 class="filter-title">Filters</h2>
    <div class="row">
        <!-- Genre Filter -->
        <select id="genreFilter">
            <option value="">All Genres</option>
            <!-- Display each genre in genre array as options for user to choose -->
            <?php foreach($genreArray as $genre): ?>
                <option value="<?php echo $genre; ?>"><?php echo $genre; ?></option>
            <?php endforeach; ?>
        </select>

        <!-- Rating Filter -->
        <select id="ratingFilter">
            <option value="">All Ratings</option>
            <!-- Create intervals of 0.5 starting from 0.0 for rating intervals for user to choose -->
            <?php
            for($i=0; $i<=9.5; $i+=0.5){
                $r = number_format($i,1);
                echo "<option value='$r'>$r+</option>";
            }
            ?>
        </select>

        <!-- Duration Filter -->
        <select id="durationFilter">
            <option value="">All Durations</option>
            <option value="15-30">15-30 min</option>
            <option value="30-60">30 min - 1 hr</option>
            <option value="60-120">1-2 hrs</option>
            <option value="120-180">2-3 hrs</option>
            <option value="180+">3+ hrs</option>
        </select>
    </div>
</section>

<div id="mediaContainer">
    <!-- Display individual media with filtering attributes and detail about media -->
    <?php foreach ($mediaArray as $m): ?>
        <div class="card"
            data-title="<?php echo strtolower($m['title']); ?>"
            data-genre="<?php echo $m['genre']; ?>"
            data-rating="<?php echo $m['rating']; ?>"
            data-duration="<?php echo $m['duration']; ?>">

            <img src="../Images/<?php echo $m['image_filename']; ?>" alt="">
            <h3><?php echo $m['title']; ?></h3>
            <p>Genre: <?php echo $m['genre']; ?></p>
            <p>Rating: <?php echo $m['rating']; ?></p>
            <p>Duration: <?php echo $m['duration']; ?></p>
        </div>

    <?php endforeach; ?>
</div>

</body>
</html>
