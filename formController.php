<?php
require 'DB_Ops.php';
require 'Upload.php';
function process_registration_form()
{
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
    //process_image exists in upload.php
    $user_image = process_image($user_id, $createdAt);
    $result = $db->create($user_id, $user_name, $full_name, $birth_date, $phone, $address, $user_image, $email, $password);

    if ($result) {
        $date_parts = explode("-", $birth_date);

        $message = "User added successfully";

        $data = array(
            "message" => $message,
        );

        echo json_encode($data);

    } else {
        echo json_encode(array('error' => "User already exist"));
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    process_registration_form();
}

?>