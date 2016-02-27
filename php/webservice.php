<?php
require "connection.php";

header('Access-Control-Allow-Origin: *');

session_start();
$data = '';

if(isset($_GET['email']) && isset($_GET['password']))
{
    if($result = $connection->query("SELECT id, name, lastname FROM user WHERE email='".$_GET["email"].
        "' AND password='".$_GET["password"]."'")) {
        if ($result->num_rows == 1) {
            $data = $result->fetch_assoc();
            $_SESSION['loginId'] = $data['id'];
            $data["status"] = 200;
        } else {
            $data["status"] = 400;
            $data["error"] = "incorrect email and password combination";
        }
        $result->free_result();

        header('content-type: application/json');
        echo json_encode($data);
    }
    else
    {
        echo $connection->error;
    }
}
elseif(isset($_GET['userId']) && (isset($_GET['garden']) && $_GET['garden']))
{
    if($_GET['userId'] > 0)
    {
        $result = $connection->query("SELECT name, feeling, humidy, light, temperature FROM garden WHERE userId=".$_GET['userId']);
        while($garden = $result->fetch_assoc()) {
            $data[] = $garden;
        }
    }
    else
    {
        $data["status"] = 400;
        $data["error"] = "incorrect user id Try again";
    }

    header('content-type: application/json');
    echo json_encode($data);
}
elseif(isset($_GET['userId']))
{
    if($_GET['userId'] > 0)
    {
        $result = $connection->query("SELECT name, feeling, humidy, light, info FROM plant WHERE userId=".$_GET['userId']);
        while($plant = $result->fetch_assoc())
        {
            $data[] = $plant;
        }
    }
    else
    {
        $data["status"] = 400;
        $data["error"] = "incorrect user id Try again";
    }

    header('content-type: application/json');
    echo json_encode($data);
}
else if(isset($_GET['logout']) && $_GET['logout'])
{
    session_destroy();
    $connection->close();

    header('content-type: application/json');
    echo json_encode("uitgelogd");
}
else if(isset($_POST['data']) && isset($_POST['garden']) && $_POST['garden'])
{
    $splittedData = splitAndRoundData($_POST['data']);


    $feeling = "";

    if($splittedData[0] > 20 && $splittedData[1] > 20)
    {
        $feeling = "Ik voel mij goed, ik heb genoeg water en warmte.";
    }
    else if($splittedData[0] < 20 && $splittedData[1] > 20)
    {
        $feeling = "Ik voel mij niet zo goed, ik heb niet genoeg water maar wel genoeg warmte.";
    }
    else if($splittedData[0] > 20 && $splittedData[1] < 20)
    {
        $feeling = "Ik voel mij niet zo goed, ik heb genoeg water maar niet genoeg warmte.";
    }
    else
    {
        $feeling = "Ik voel mij niet goed, ik heb niet genoeg water en niet genoeg warmte.";
    }

    if($connection->query("UPDATE garden SET feeling='".$feeling."', humidy=".$splittedData[1].", light= 20".
            ", temperature=".$splittedData[1].", feed=25 WHERE id=2 AND userId=1"))
    {
        echo json_encode("gelukt moestuin");
    }
    else
    {
        echo json_encode("mislukt");
    }

    echo json_encode($splittedData);
}
else if(isset($_POST['data']))
{
    $splittedData = splitAndRoundData($_POST['data']);


    $feeling = "";

    if($splittedData[0] > 20 && $splittedData[1] > 20)
    {
        $feeling = "Ik voel mij goed, ik heb genoeg water en licht.";
    }
    else if($splittedData[0] < 20 && $splittedData[1] > 20)
    {
        $feeling = "Ik voel mij niet zo goed, ik heb niet genoeg water maar wel genoeg licht.";
    }
    else if($splittedData[0] > 20 && $splittedData[1] < 20)
    {
        $feeling = "Ik voel mij niet zo goed, ik heb genoeg water maar niet genoeg licht.";
    }
    else
    {
        $feeling = "Ik voel mij niet goed, ik heb niet genoeg water en niet genoeg licht.";
    }

    if($connection->query("UPDATE plant SET feeling='".$feeling."', humidy=".$splittedData[0].", light=".$splittedData[1].
        ", temperature=20, waterlevel=".$splittedData[2]." WHERE id=2 AND userId=1"))
    {
        echo json_encode("gelukt plant");
    }
    else
    {
        echo json_encode("mislukt");
    }

        echo json_encode($splittedData);
}
else
{
    $data["status"] = 404;
    $data["error"] = "unavailable method";

    header("content-type: application/json");
    echo json_encode($data);
}

function splitAndRoundData($data)
{
    $array = explode(",", $data);
    $rounded = [];

    foreach($array as $item)
    {
        $rounded[] = ceil($item);
    }

    return $rounded;
}