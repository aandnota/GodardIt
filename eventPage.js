function windowCallback(newWindow)
{
    var tabID = newWindow.tabs[0].id;
    chrome.tabs.executeScript(tabID, { file: "newTab.js" });
    chrome.tabs.insertCSS(tabID, { code: "* { cursor: url('http://i.imgur.com/SfxJ4EV.png'), auto !important; }" });
};
		
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file:"Godard.js"});
    chrome.tabs.insertCSS(null, { code: "* { cursor: url('http://i.imgur.com/SfxJ4EV.png'), auto !important; }" });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		var popupWidth = Math.round( Math.random() * 500 + 100 );
		var popupHeight = Math.round( Math.random() * 500 + 100 );
		var popupLeft = Math.round( Math.random() * (screen.width - popupWidth) );
		var popupTop = Math.round( Math.random() * (screen.height - popupHeight) );
		
		chrome.windows.create(
			{ url: request.url,
				left: popupLeft,
				top: popupTop,
				width: popupWidth,
				height: popupHeight,
				type: "panel"
			}, windowCallback);
  });
