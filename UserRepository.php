<?php
class UserRepository {
  private $mysqli;

  public function __construct() {
    $this->mysqli = new mysqli('localhost', 'root', '', 'users_db');

    if ($this->mysqli->connect_errno) {
      die('Connect Error: ' . $this->mysqli->connect_errno);
    }
  }
  private function exist($user_name) {
    $stmt = $this->mysqli->prepare("SELECT * FROM users WHERE user_name = ?");
    $stmt->bind_param('s', $user_name);
    $stmt->execute();
    $stmt->store_result();
    $result = $stmt->num_rows;
    $stmt->close();

    return $result > 0 ? true: false;
  }
  public function create($user_id, $user_name, $full_name, $birth_date, $phone, $address, $user_image, $email, $password) {
    if ($this->exist($user_name))  return false;

    $stmt = $this->mysqli->prepare("INSERT INTO users (user_id, user_name, full_name, birthdate, phone, address, user_image, email, password, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param('sssssssss', $user_id, $user_name, $full_name, $birth_date, $phone, $address, $user_image, $email, $password);
    $stmt->execute();
    $stmt->close();
    
    return true;
  }

}
?>