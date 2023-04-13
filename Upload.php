<!-- . “Upload.php”: will include your code for processing the uploaded image. -->
<?php
function process_image($user_id, $createdAt)
{
    $fileName = $_FILES['user_image']['name'];
    $fileTemp = $_FILES['user_image']['tmp_name'];

    $exp = explode(".", $fileName);
    $extension = end($exp);

    $newFileName = $user_id . $createdAt . "." . $extension;

    $target = __DIR__ . "//uploads//" . "/" . $newFileName;

    if (move_uploaded_file($fileTemp, $target))
        return $newFileName;
}

?>