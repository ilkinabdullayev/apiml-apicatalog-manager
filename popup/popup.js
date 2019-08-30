'use strict';

let openApiCatalogButton = document.getElementById('openApiCatalogButton');
let openJESShellButton = document.getElementById('openJESShellButton');
let consoleToggleButton = document.getElementById('consoleToggleButton');
let eurekaToggleButton = document.getElementById('eurekaToggleButton');

openApiCatalogButton.onclick = function(element) {
    chrome.tabs.update(null, { url: 'https://localhost:10010/ui/v1/apicatalog'});
    // chrome.tabs.onload(openApiCatalogButton.remove())
    chrome.tabs.onUpdated.addListener(function (tabId , info) {
        if (info.status === 'complete') {
            openApiCatalogButton.remove()
            consoleToggleButton.hidden = false;
            eurekaToggleButton.hidden = false;
        }
    });
}

openJESShellButton.onclick = function(element) {
    chrome.tabs.create({ url:'javascript:document.write(\"<iframe style=\"width:100%;height:540px;background:black;border:none\"></iframe>\")'});
}


//style="width=100%;height:540px;background:black;border:none" src="banner/append_banner.html"