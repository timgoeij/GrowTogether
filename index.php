<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>GrowTogether</title>
    <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <div id="login">
        <div id="title"><img id="logo" src="img/Logo350px.png"/></div>
        <div id="login-form">
            <div id="icon-holder">
                <img class="inline" src="img/UserIcon.png"/>
                <div id="icon-text" class="inline">
                    <span>Welkom Gebruiker!</span>
                    vul hier uw gegevens
                    in om in te loggen.
                </div>
            </div>
            <form id="form" method="post" action="">
                <div>
                    <label for="email">E-mail</label>
                </div>
                <div>
                    <input class="input" id="email" name="email" type="email"/>
                </div>
                <div>
                    <label for="password">wachtwoord</label>
                </div>
                <div>
                    <input class="input" id="password" name="password" type="password">
                    <input id="submit" name="submit" type="submit" value="Inloggen">
                </div>
                <div>
                    <a href="">wachtwoord vergeten?</a>
                </div>
            </form>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="js/plant.js" type="text/javascript"></script>
    <script src="js/Garden.js" type="text/javascript"></script>
    <script src="js/main.js" type="text/javascript"></script>

</body>
</html>
