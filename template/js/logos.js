function addLogos()
{
    var logos = document.getElementsByClassName("logo_cache");
    if (logos.length == 0)
    {
        return;
    }
    var logodiv = document.createElement("DIV");
    logodiv.classList.add("logos-container");
    var spacer = document.createElement("SPAN");
    spacer.classList.add("logos-spacer");
    for(var i = 0; i < logos.length; i++)
    {
        var logo = document.createElement("IMG");
        logo.src = logos[i].src;
        logo.classList.add("logo");
        logodiv.appendChild(logo);
        if(i < logos.length - 1)
        {
            var spacerclone = spacer.cloneNode(false);
            logodiv.appendChild(spacerclone);
        }
    }
    document.getElementById("title").appendChild(logodiv);
}
addLogos();
