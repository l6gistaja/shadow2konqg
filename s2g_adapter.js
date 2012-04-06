/*

How to install Shadowbox to HTML gallery.

Files:
0.html = gallery created by Konqueror HTML gallery tool
index.html = shadowboxed gallery

0) Before using (Konqueror) HTML gallery tool, removing dublicates might be good idea:

fdupes -r -d -N ./

1) Add shadowbox rel attributes, for example with sed:

sed -e 's/<a href/<a rel="shadowbox[g]" href/g;' 0.html > index.html

2) Add shadowbox Javascripts to index.html HEAD tag:

<link rel="stylesheet" type="text/css" href="../shadow2konqg/shadowbox/shadowbox.css">
<script type="text/javascript" src="../shadow2konqg/shadowbox/shadowbox.js"></script>
<script type="text/javascript" src="../shadow2konqg/s2g_adapter.js"></script>

3) You can add more functionality to index.html BODY tag, for example:

<script type="text/javascript">document.writeln(jsConfHTML());</script>

*/

function queryStr2Obj() {
    req = {};
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i=0;i<gy.length;i++) {
        ft = gy[i].split("=");
        req[ft[0]] = ft[1];
    }
    return req;
}

function setSlideshow(t) {
    t = parseInt(t);
    Shadowbox.options.slideshowDelay =  !isNaN(t) && t > -1 ? t : 0;
}

function shadowBoxConf() {
    if(req.x_disablejsgallery == '1') {
        if(confirm("Do you want to enable navigation and slideshows?")) {
            location.href='?';
        }
    } else {
        answer = prompt(
            "To navigate through gallery use arrow keys. Space(bar) stops/resumes slideshow.\n\n"
            + "To create slideshow, enter display time of each picture in seconds (0 disables slideshow) below and press [OK].\n\n"
            + "To disable navigation and slideshows, press [Cancel]."
            , Shadowbox.options.slideshowDelay
        );
        if(answer != null) {
            setSlideshow(answer);
        } else {
            location.href='?x_disablejsgallery=1';
        }
    }
}

function jsConfHTML() {
    return '<input type="button" onclick="shadowBoxConf();return false;" value="Settings"/>';
}

var req = queryStr2Obj();

if(req.x_disablejsgallery != '1') {

    Shadowbox.init({
        continuous: true,
        animate: false,
        animateFade: false,
        viewportPadding: 5,
        resizeDuration: 0.1,
        overlayOpacity: 1
    });
    
    setSlideshow(req.slideshowDelay);
    //window.onload = function() { if(this.req.f_play == '1') { Shadowbox.play(); };

}



