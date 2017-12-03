function changeLinkTargets()
{
    if(change_link_targets == false)
    {
        return;
    }
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++)
    {
        if(links[i].target == "")
        {
            links[i].target = "_blank";
        }
    }
}
if(change_link_targets)
{
    changeLinkTargets();
}
