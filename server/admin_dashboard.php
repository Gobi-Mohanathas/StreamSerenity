<?php
/**
 * Author: Gobi Mohanathas
 * File Name: admin_dashboard.php
 * Date of Creation: January 6, 2025
 * Purpose: Admin tool dashboard page which allows the admin to add and delete medias to and from
 *          the database.
 */
// Include and run code from db.php
require "db.php";

// Include and run code from auth_logged_in.php
require "auth_logged_in.php";

// Check to see if media add form is submitted
if (isset($_POST['add_movie'])) {
    // Store media information provided through media upload form for title, genre, rating,
    // duration, whether premium or not, media type and image filename.
    $title = ($_POST['title']);
    $genre = ($_POST['genre']);
    $rating = ($_POST['rating']);
    $duration = ($_POST['duration']);
    $isPremium = isset($_POST['is_premium']) ? (int)$_POST['is_premium'] : 0;
    $mediaType = ($_POST['media_type']);
    $imageFileName = null;

    // Logic to handle routing of uploaded image to appropriate Images folder, and saving full path name
    // to access image.
    if (isset($_FILES['media_image']) && $_FILES['media_image']['error'] === UPLOAD_ERR_OK) {

        // Storing pathway to Images folder
        $upload_dir = "../Images/";

        // Extract file name from uploaded media image
        $file_name = basename($_FILES['media_image']['name']);

        // Store target path information appending directory path along with filename
        $target_path = $upload_dir . $file_name;

        // Moves uploaded file from temporary location to target path location and storing that 
        // information
        if (move_uploaded_file($_FILES['media_image']['tmp_name'], $target_path)) {
            $imageFileName = $file_name;
        }
    }

    // Statement to insert media into media catalog table in database
    $sql_statement = "INSERT INTO media_catalog (title, genre, rating, duration, is_premium, image_filename, media_type)
                     VALUES (:title, :genre, :rating, :duration, :is_premium, :imagepath, :media_type)";
    
    // Prepare sql statement and replace placeholders with stored information of media
    $result = $db->prepare($sql_statement);

    $result->bindParam(':title', $title);
    $result->bindParam(':genre', $genre);
    $result->bindParam(':rating', $rating);
    $result->bindParam(':duration', $duration);
    $result->bindParam(':is_premium', $isPremium, PDO::PARAM_INT);
    $result->bindParam(':imagepath', $imageFileName);
    $result->bindParam(':media_type', $mediaType);

    // Execute the sql statement and alert user whether media upload was successful or not
    if ($result->execute()) {
        echo "<script>alert('Media uploaded successfully');</script>";
    }
    else {
        echo "<script>alert('Error in uploading media');</script>";
    }
}

// Check to see if delete media form was submitted
if (isset($_POST['delete_movie'])) {

    // Storing movie title information from delete media form
    $titleDelete = $_POST['title'];

    // Store sql statement and bind placeholder element with stored delete media title
    $delete_statement = $db->prepare("DELETE FROM media_catalog WHERE title = :title");
    $delete_statement->bindParam(":title", $titleDelete);
    
    // Execute the sql statment and store the number of rows affected by delete statement
    $delete_statement->execute();
    $count = $delete_statement->rowCount();
    
    // If rows were deleted
    if ($count > 0) {
        // Movie exists - proceed with delete
        $delete_statement = $db->prepare("DELETE FROM media_catalog WHERE title = :title");
        $delete_statement->bindParam(":title", $titleDelete);
        
        // If delete statement successfully runs alert user verifying this, otherwise alert
        // user it was unsuccessful
        if ($delete_statement->execute()) {
            echo "<script>alert('Movie \"$titleDelete\" deleted successfully!');</script>";
        } else {
            echo "<script>alert('Failed to delete movie.');</script>";
        }
        
    } else {
        // Movie doesn't exist and alert user with message
        echo "<script>alert('Movie \"$titleDelete\" not found in database.');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard | StreamSerenity</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Css/style.css">
    <script src="../scripts/admin_controls_script.js" defer></script>
</head>
<body>

<header class="navbar">
    <div class="nav-left">
        <div class="logo">STREAMSERENITY</div>
        <ul class="nav-links">
            <li><a href="admin_index.php">Home</a></li>
            <li><a href="movies.php">Movies</a></li>
            <li><a href="tv-show.php">TV Shows</a></li>
            <li><a href="Account.php">Account</a></li>
            <li><a href="admin_dashboard.php">Admin Tool</a></li>
        </ul>
    </div>

    <div class="nav-right">
        <a href="Logout.php">Logout</a>
    </div>
</header>

<div class="admin-dashboard-wrapper">
    <h1 class="admin-dashboard-title">Admin Dashboard</h1>

    <!-- Add Movie Form -->
    <div class="admin-card">
        <h2>Add Media</h2>
        <form action="" method="POST" class="admin-add-form" enctype="multipart/form-data">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" class="admin-input" required>

            <label for="genre">Genre</label>
            <input type="text" name="genre" id="genre" class="admin-input" required>

            <label for="rating">Rating</label>
            <input type="text" name="rating" id="rating" class="admin-input" required>

            <label for="duration">Duration (hours:minutes:seconds)</label>
            <input type="text" name="duration" id="duration" class="admin-input" required>

            <label for="is_premium">Is Premium?</label>
            <select name="is_premium" id="is_premium" class="admin-input" required>
                <option value="">Please select an option</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>

            <label for="media_type">Media Type</label>
            <select name="media_type" id="media_type" class="admin-input" required>
                <option value="">Please select an option</option>
                <option value="movie">Movie</option>
                <option value="show">Show</option>
            </select>

            <label for="media_image">Upload Image</label>
            <input type="file" name="media_image" accept="image/*">

            <input type="submit" value="Add Media" name="add_movie" class="admin-button">
            <input type="reset" value = "Reset Form" name = "reset_form" class="admin-button">
        </form>
    </div>

    <!-- Delete Movie Form -->
    <div class="admin-card">
        <h2>Delete Movie</h2>
        <form action="" method="POST" class="admin-delete-form">
            <label for="title_delete">Title</label>
            <input type="text" name="title" id="title_delete" class="admin-input" required>

            <input type="submit" value="Delete Movie" name="delete_movie" class="admin-button">
        </form>
    </div>
</div>

</body>
</html>
