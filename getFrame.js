var contentFrame = document.getElementById('contentframe');
var frame = contentFrame.getElementsByTagName("iframe")[0];

chrome.runtime.sendMessage({ type: "newPage", url: frame.src });