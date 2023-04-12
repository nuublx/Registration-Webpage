<?php 
require 'UserRepository.php';
function process_registration_form() {
    $db = new UserRepository();

    $user_id = uniqid("USR");
    $createdAt = time();

    $full_name = $_POST['full_name'];
    $user_name = $_POST['user_name'];
    $birth_date = $_POST['birth_date'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    $user_image = process_image($user_id, $createdAt);
    $result = $db->create($user_id, $user_name, $full_name, $birth_date, $phone, $address, $user_image, $email, $password, $createdAt);

    if ($result) {
        echo json_encode(array('message' => "User added successfully"));
    }
    else {
        echo json_encode(array('error' => "User already"));
    }
}
function process_image($user_id, $createdAt) {
    $fileName = $_FILES['user_image']['name'];
    $fileTemp = $_FILES['user_image']['tmp_name'];

    $exp = explode(".", $fileName);
    $extension = end($exp);

    $newFileName = $user_id . $createdAt ."." . $extension;
    
    $target = __DIR__."//uploads//"."/".$newFileName;

    if (move_uploaded_file($fileTemp, $target))
        return $newFileName;
}
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    process_registration_form();
}

?>