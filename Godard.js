document.documentElement.style.webkitFilter='grayscale(100%)';

var links = document.getElementsByTagName("a");
var count = 20;
for (var i=0; i < links.length; i++) {
	if( links[i].href.indexOf("http") == 0 )
	{
		chrome.runtime.sendMessage({url: links[i].href});
		
		if( count-- <= 0 )
		{
			break;
		}		
	}
}

