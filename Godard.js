document.documentElement.style.webkitFilter = 'grayscale(100%)';

var links = document.getElementsByTagName("a");
var linkArray = [];
for( var i = 0; i < links.length; i++ )
{
    linkArray.push( links[i] );
}

var count = 20;
while (linkArray.length > 0 && count > 0) {
    var i = Math.floor( Math.random() * linkArray.length );
    if (linkArray[i].href.indexOf("http") == 0) {
        chrome.runtime.sendMessage({ type: "newWindow", url: linkArray[i].href });
        count--;
    }

    linkArray.splice(i, 1);
}

