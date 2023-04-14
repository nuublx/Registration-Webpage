<?php
require 'DB_Ops.php';
require 'Upload.php';
class formController{

    function process_registration_form()
    {

        $db = new UserRepository();
        $upload_image = new upload();
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
        $user_image = $upload_image->process_image($user_id, $createdAt);
        $result = $db->create($user_id, $user_name, $full_name, $birth_date, $phone, $address, $user_image, $email, $password);

        if ($result) {
            echo json_encode(array("response" => "User added successfully"));

        } else {
            echo json_encode(array('response' => "User already exist"));
        }
        ob_get_clean();
    }
}
?>