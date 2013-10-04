function translateURL(url)
{
	return "http://translate.google.com/translate?js=n&sl=auto&tl=fr&u=" + url;
}

function windowCallback(newWindow)
{
    var tabID = newWindow.tabs[0].id;
    chrome.tabs.insertCSS(tabID, { code: "* { cursor: url('http://i.imgur.com/rKdkpWu.png'), auto !important; }" });
    chrome.tabs.executeScript(tabID, { file: "newTab.js" });
};

function removeFrame(tab)
{
	chrome.tabs.onUpdated.removeListener( removeFrame );
	chrome.tabs.executeScript(tab.id, {file:"getFrame.js"});
};

var i = 1;

function newTab(tab)
{
    if( i++ > 1 )
    {
		chrome.tabs.onUpdated.removeListener( newTab );
	    chrome.tabs.insertCSS(tab.id, { code: "* { cursor: url('http://i.imgur.com/rKdkpWu.png'), auto !important; }" });
		chrome.tabs.executeScript(tab.id, {file: "Godard.js"});
    }
};

function openWindow( url )
{
	var popupWidth = Math.round( Math.random() * 500 + 100 );
	var popupHeight = Math.round( Math.random() * 500 + 100 );
	var popupLeft = Math.round( Math.random() * (screen.width - popupWidth) );
	var popupTop = Math.round( Math.random() * (screen.height - popupHeight) );
	
	chrome.windows.create(
		{ url: url,
			left: popupLeft,
			top: popupTop,
			width: popupWidth,
			height: popupHeight,
			type: "panel"
		}, windowCallback);
}

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.onUpdated.addListener(removeFrame);
	chrome.tabs.update(tab.id, {url: translateURL( tab.url ) });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	switch( request.type )
  	{
  		case "newWindow":
  			openWindow( request.url );
  			break;
  		case "newPage":
			chrome.tabs.onUpdated.addListener(newTab);
			chrome.tabs.update(sender.tab.id, {url: request.url }, newTab);
			break;
  	}
  });
