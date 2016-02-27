/**
 * Created by Tim on 19-1-2016.
 */
function Garden(name, feeling, humidy, light, temperature)
{
    this.name = name;
    this.feeling = feeling;
    this.humidy = humidy;
    this.light = light;
    this.temperature = temperature;
    this.item = '';
    this.crops = "";

    this.init = function()
    {
        var nameBlock = $('<div>', {class: "title"}).append($('<h2>', {html: this.name}));

        var feelingIcon = "";

        if(parseInt(this.light) < 20 || parseInt(this.humidy) < 20)
        {
            feelingIcon = $('<img>', {class: "info-icon small", src: "img/Sad.png"});
        }
        else
        {
            feelingIcon = $('<img>', {class: "info-icon small", src: "img/Happy.png"});
        }

        var feelingBlock = $('<div>', {class: "garden-info-block"}).append(
            $('<div>', {class: "info-text", html: this.feeling}),
            feelingIcon
        );

        var waterBlock = $('<div>', {class: "garden-info-block"}).append(
            $('<p>', {class: "info-text", html: "Water-niveau"}),
            $('<div>', {class: "lineholder"}).append(
                $("<div>", {class: "line"}).css("background","-webkit-linear-gradient(left, #40A660 "+ parseInt(humidy)+"%, white "+(100 - parseInt(humidy))+"%)"),
                $("<p>", {class: "line-text", html: humidy+"%"}).css("left", (parseInt(humidy)-5)+"%")
            ),
            $('<img>', {class: "info-icon icon small", src: "img/WaterLevel.png"}),
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

        var lightBlock = $('<div>', {class: "garden-info-block"}).append(
            $('<p>', {class: "info-text", html: "Zon-niveau"}),
            $('<div>', {class: "lineholder"}).append(
                $("<div>", {class: "line"}).css("background","-webkit-linear-gradient(left, #40A660 "+ parseInt(light)+"%, white "+(100 - parseInt(light))+"%)"),
                $("<p>", {class: "line-text", html: light+"%"}).css("left", (parseInt(light)-5)+"%")
            ),
            $('<img>', {class: "info-icon icon small", src: "img/SolarLevel.png"}),
            $('<p>', {class: "info-text", html: "Zon-niveau is <span>" + lightinfo + "</span>"})
        );

        var temperatureLine = "";
        var temperatureText = "";
        var lineholder = $('<div>', {class: "lineholder"});


        if(parseInt(this.temperature) > 0)
        {
            temperatureLine = $('<div>',{class: "line"}).css("background","-webkit-linear-gradient(left, white 20%, #40A660 "+
                (((parseInt(this.temperature) / 50) * 100) - 20)+"%, white "+(100 - ((parseInt(this.temperature) / 50) * 100))+"%");

            temperatureText = $('<p>', {class: "line-text", html: this.temperature+"&deg;C"}).css("left", (((parseInt(this.temperature) / 50) * 100)-15)+"%");
        }
        else
        {
            temperatureLine = $('<div>',{class: "line"}).css("background","-webkit-linear-gradient(left, white "+(20 -(((parseInt(this.temperature) * -1) / 50) * 100))+"%, #40A660 "+
                (((parseInt(this.temperature) * -1) / 50) * 100)+"%, white 80%)");

            temperatureText = $('<p>', {class: "line-text", html: this.temperature+"&deg;C"}).css("left", (((parseInt(this.temperature) * -1) / 50) * 100)+"%");
        }



        var temperatureBlock = $('<div>', {class: "garden-info-block"}).append(
            $('<p>', {class: "info-text", html: "Temperatuur"}),
            lineholder);

        if(parseInt(this.temperature) > 0)
        {
            lineholder.append(temperatureLine,
                $("<p>", {class: "line-text", html: "-10&deg;C"}).css("left", "0%"),
                $("<p>", {class: "line-text", html: "0&deg;C"}).css("left", "10%"),
                temperatureText,
                $("<p>", {class: "line-text", html: "40&deg;C"}).css("left", "75%"));
        }
        else
        {
            lineholder.append(temperatureLine,
                $("<p>", {class: "line-text", html: "-10&deg;C"}).css("left", "0%"),
                temperatureText,
                $("<p>", {class: "line-text", html: "0&deg;C"}).css("left", "10%"),
                $("<p>", {class: "line-text", html: "40&deg;C"}).css("left", "75%"));
        }

        temperatureBlock.append($('<img>', {class: "info-icon icon small", src: "img/Temperature.png"}));

        this.crops = this.initCrops();

        this.item = $("<div>", {id:"garden"}).append(nameBlock,$("<div>",{ id:"garden-holder"}).append(
            feelingBlock, waterBlock,lightBlock,temperatureBlock), this.crops);
    };

    this.initCrops = function()
    {
        var crop = $("<div>", {id:"crops"});
        var holder = $("<div>", {id:"crop-holder"});

        for(var i = 0; i < 4; i++)
        {
            var item = $("<div>", {class: "crop"}).append(
                $('<img>', {class: "crop-image", src: "img/Strawberry.png"}));

            if(i == 0)
                item.append(
                    $("<p>", {class:"day-count", html: "Oogst"}));
            else
                item.append(
                    $("<p>", {class:"day-count", html: i+"d"}));

            holder.append(item);
        }

        crop.append(holder);

        return crop;
    };
}