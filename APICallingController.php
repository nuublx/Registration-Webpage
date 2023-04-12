<?php

function getActorsIDs($month, $day)
{
    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "https://online-movie-database.p.rapidapi.com/actors/list-born-today?month=" . $month . "&day=" . $day,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "X-RapidAPI-Host: online-movie-database.p.rapidapi.com",
            "X-RapidAPI-Key: 62d0df0dadmsh6f9c3805c3ef8e4p1c93e4jsn67530d087a3e"
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        return ("cURL Error #:" . $err);
    } else {
        return $response;
    }
}

function getActorsData($month, $day)
{
    $actorsIDs = json_decode(getActorsIDs($month, $day), true);
    $IDs = [];

    foreach ($actorsIDs as $value) {
        $IDs[] = substr($value, 6, 9);
    }

    $actorsNames = [];

    for ($i = 0; $i < count($IDs); $i++) {


        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://imdb8.p.rapidapi.com/actors/get-bio?nconst=" . $IDs[$i],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Host: online-movie-database.p.rapidapi.com",
                "X-RapidAPI-Key: 62d0df0dadmsh6f9c3805c3ef8e4p1c93e4jsn67530d087a3e"
            ],
        ]);

        $response = curl_exec($curl);
        // Convert the JSON response into a PHP object or associative array
        $data = json_decode($response, true);

        // Access the name property of the object or array
        $name = $data['name'];

        $actorsNames[] = $name;

        curl_close($curl);

    }

    $data = array(
        "Actors' names" => $actorsNames
    );

    echo json_encode($data);

}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $month = $_GET['month'];
    $day = $_GET['day'];
    getActorsData($month, $day);
}




?>