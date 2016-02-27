/**
 * Created by Tim on 9-12-2015.
 */
function Plant(light, humidy, name, feeling, info) {
    this.light = light;
    this.humidy = humidy;
    this.name = name;
    this.info = info;
    this.feeling = feeling;
    this.item = '';

    this.init = function () {
        var nameBlock = $('<div>', {class: "title"}).append($('<h2>', {html: this.name}));

        var feelingIcon = "";

        if(parseInt(this.light) < 20 || parseInt(this.humidy) < 20)
        {
            feelingIcon = $('<img>', {class: "info-icon", src: "img/Sad.png"});
        }
        else
        {
            feelingIcon = $('<img>', {class: "info-icon", src: "img/Happy.png"});
        }

        var feelingBlock = $('<div>', {class: "feel info-block"}).append(
            $('<div>', {class: "info-text", html: this.feeling}),
            feelingIcon
        );

        var waterBlock = $('<div>', {class: "info-block"}).append(
            $('<p>', {class: "info-text", html: "Water-niveau"}),
            $('<div>', {class: "lineholder"}).append(
                $("<div>", {class: "line"}).css("background","-webkit-linear-gradient(left, #40A660 "+ parseInt(humidy)+"%, white "+(100 - parseInt(humidy))+"%)"),
                $("<p>", {class: "line-text", html: humidy+"%"}).css("left", (parseInt(humidy)-5)+"%")
            ),
            $('<img>', {class: "info-icon icon", src: "img/WaterLevel.png"}),
            $('<p>', {class: "info-text", html: "Water bijvullen in <span>" +parseInt(this.humidy) / 10 + "</span> dagen"})
        );

        var lightinfo = "";
        if (parseInt(this.light) > 20) {
            lightinfo = "goed";
        }
        else if (parseInt(this.light) < 20 && parseInt(this.light) > 10) {
            lightinfo = "matig";
        }
        else {
            lightinfo = "slecht";
        }

        var lightBlock = $('<div>', {class: "info-block"}).append(
            $('<p>', {class: "info-text", html: "Zon-niveau"}),
            $('<div>', {class: "lineholder"}).append(
                $("<div>", {class: "line"}).css("background","-webkit-linear-gradient(left, #40A660 "+ parseInt(light)+"%, white "+(100 - parseInt(light))+"%)"),
                $("<p>", {class: "line-text", html: light+"%"}).css("left", (parseInt(light)-5)+"%")
            ),
            $('<img>', {class: "info-icon icon", src: "img/SolarLevel.png"}),
            $('<p>', {class: "info-text", html: "Zon-niveau is <span>" + lightinfo + "</span>"})
        );

        var infoBlock = $('<div>', {class: "info"}).append(
            $('<div>', {
                class: "info-text",
                html: "Wil je meer over <span>" + this.name + "</span> weten?, klik hier voor meer <a href='" + this.info + "'>info</a>"
            }),
            $('<img>', {class: "info-icon", src: "img/WantToKnowMoreIcon.png"})
        );

        this.item = $('<div>', {class: "plant"}).append(nameBlock, feelingBlock, waterBlock, lightBlock, infoBlock);
    }
}