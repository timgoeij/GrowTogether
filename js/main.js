$(init);

var loginId = 0;
var accountData = [];
var loginBlock = "";
var loginForm = "";
var infoBlock = "";
var menuBlock = "";
var plants = [];


function init()
{
    loginBlock = $("#login");
    loginForm = $('#form');
    loginForm.on('submit', loginHandler);

    if(typeof(Storage)!== "undefined" )
    {
        if(window.sessionStorage.id && window.sessionStorage.id != " ")
        {
            createMenu();
        }
        else
        {
            window.sessionStorage.id = " ";
            window.sessionStorage.name = " ";
            window.sessionStorage.lastname = " ";
        }
    }
}

function loginHandler(e)
{
    e.preventDefault();

    $.getJSON("http://timgoeijenbier.nl/growtogether/php/webservice.php", {email: $('#email').val(), password: $('#password').val()}, getLoginData);
}

function getLoginData(response)
{
    if(response.status == 200)
    {

        if(window.sessionStorage.id)
        {
            window.sessionStorage.id = response.id;
            window.sessionStorage.name = response.name;
            window.sessionStorage.lastname = response.lastname;
        }
        else
        {
            loginId = parseInt(response.id);
            accountData['name'] = response.name;
            accountData['lastname'] = response.lastname;
        }

        createMenu();
    }
}

function createMenu()
{
    var profile = "";

    if(window.sessionStorage.id)
    {
       profile = $('<div>', {class:"inline name-text", html: "<span class='thin'>Hallo,</span> "+ window.sessionStorage.name + " " + window.sessionStorage.lastname});
       $('#icon-text').html("Welkom! " + window.sessionStorage.name+ " " + window.sessionStorage.lastname).attr("id", "name-text");
    }
    else
    {
        profile = $('<div>', {class:"inline name-text", html: "<span class='thin'>Hallo,</span> "+ accountData['name'] + " " + accountData['lastname']});
        $('#icon-text').html("Welkom! " + accountData['name']+ " " + accountData['lastname']).attr("id", "name-text");
    }

    menuBlock = $('<div>', {id:"menu"}).append(
        $('<img>', {id:"menu-img", src:"img/Logo350px.png"}),
    $('<div>', {id:"icon-holder", class: "menu"}).append(
        $('<img>', {class:"inline icon-margin", src:"img/UserIcon.png"}),
    profile),
    $('<a>', {class:"menu-link", html: "Overzicht producten", title:"sumary"}),
        $('<a>', {class:"menu-link hide", html: "Bloempotten", title:"flower"}).hide(),
        $('<a>', {class:"menu-link hide", html: "Moestuin", title: "garden"}).hide());

    $('#login-form').append($('<p>', {html: "Kies een optie links om verder te gaan"}));
    $('#form').remove();

    var logout = $('<div>', {id:"logout", html: "Uitloggen"});

    infoBlock = $('<div>', {id:"information-block"});


    $("body").append(menuBlock, logout, infoBlock.hide());

    $('.menu-link').on('click', menuLinkHandler);
    $('#logout').on('click', logoutHandler);
}

function menuLinkHandler(e)
{
    e.preventDefault();

    var target = $(e.target);

    $('.menu-link').each(function()
    {
       if($(this).get(0) == target.get(0))
       {
           if(!target.hasClass("select"))
           {
               target.toggleClass("select");
           }
       }
        else
       {
           if($(this).hasClass("select"))
           {
               if($(this).attr('title') != "sumary")
               {
                   $(this).toggleClass("select");
               }
           }
       }
    });


    switch (target.attr('title'))
    {
        case "sumary": $(".hide").show();
            break;
        case "flower":

            if(!infoBlock.hasClass("plants"))
            {
                plants.splice(0,plants.length);

                if(window.sessionStorage.id)
                    $.getJSON("http://timgoeijenbier.nl/growtogether/php/webservice.php", {userId: parseInt(window.sessionStorage.id)}, getAllPlants);
                else
                    $.getJSON("http://timgoeijenbier.nl/growtogether/php/webservice.php", {userId: loginId}, getAllPlants);
            }

            break;
        case "garden":

            if(!infoBlock.hasClass("gardens"))
            {
                plants.splice(0,plants.length);

                if(window.sessionStorage.id)
                    $.getJSON("http://timgoeijenbier.nl/growtogether/php/webservice.php", {userId: parseInt(window.sessionStorage.id), garden: true}, getgarden);
                else
                    $.getJSON("http://timgoeijenbier.nl/growtogether/php/webservice.php", {userId: loginId, garden: true}, getgarden);
            }

            break;
    }
}

function logoutHandler(e)
{
    $.getJSON("http://timgoeijenbier.nl/growtogether/php/webservice.php", {logout: true}, Logout);

}

function Logout(response)
{
    loginId = 0;
    window.sessionStorage.id = " ";
    window.sessionStorage.name = " ";
    window.sessionStorage.lastname = " ";

    setStartMenu();
}


function getAllPlants(response)
{
    $.each(response, function(i, val)
    {
        var newPlant = new Plant(val.light, val.humidy, val.name, val.feeling, val.info);
        newPlant.init();
        plants.push(newPlant);
    });

    createPlantBox();
}

function getgarden(response) {
    $.each(response, function (i, val) {
        var newGarden = new Garden(val.name, val.feeling, val.humidy, val.light, val.temperature);
        newGarden.init();
        plants.push(newGarden);

    });

    createGardenBox();
}
function createPlantBox()
{
    infoBlock.empty().toggleClass("plants").append($("<h1>", {class: "title", html: "Bloempotten"}));

    if(infoBlock.hasClass("gardens"))
        infoBlock.toggleClass("gardens");

    $.each(plants, function(i, val)
    {
       infoBlock.append(val.item);
    });

    loginBlock.hide();
    infoBlock.show();
}

function createGardenBox()
{
    infoBlock.empty().toggleClass("gardens").append($("<h1>", {class: "title", html: "Moestuin"}));

    if(infoBlock.hasClass("plants"))
        infoBlock.toggleClass("plants");

    console.log(plants);

    $.each(plants, function(i, val)
    {
        infoBlock.append(val.item);
    });

    loginBlock.hide();
    infoBlock.show();
}

function setStartMenu()
{
    menuBlock.replaceWith(loginBlock);
    $("#logout").remove();

    loginBlock.show();

    $("#name-text").html("<span>Welkom Gebruiker!</span> Vul hier uw gegevens in om in te loggen.").attr("id", "icon-text");

    $('#login-form p').replaceWith(loginForm);

    $('body').children().each(function()
    {
        if($(this).is(infoBlock))
        {
            infoBlock.remove();
        }
    });

}