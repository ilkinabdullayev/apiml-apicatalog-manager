'use strict';

let openApiCatalogButton = document.getElementById('openApiCatalogButton');

openApiCatalogButton.onclick = function(element) {
    chrome.tabs.update(null, { url: 'https://localhost:10010/ui/v1/apicatalog' });
}
