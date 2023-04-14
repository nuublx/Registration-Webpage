<?php
class upload {

    private $fileName;
    private $fileTemp;
    private $extension;
    private $target;
    function __construct() {
        $this->fileName="";
        $this->fileTemp="";
        $this->extension="";
        $this->target="";
    }
    function process_image($user_id, $createdAt)
    {
        $this -> fileName = $_FILES['user_image']['name'];
        $this->fileTemp = $_FILES['user_image']['tmp_name'];

        $exp = explode(".", $this->fileName);
        $this->extension = end($exp);

        $newFileName = $user_id . $createdAt . "." . $this->extension;

        $this->target = __DIR__ . "//uploads//" . "/" . $newFileName;

        if (move_uploaded_file($this->fileTemp, $this->target))
            return $newFileName;
        return null;
    }
}
?>