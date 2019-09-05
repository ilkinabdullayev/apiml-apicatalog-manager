'use strict';

function executeContentScript() {
    chrome.tabs.executeScript({
        file: 'contentScript.js'
    })
}

function getActiveHost(url) {
    let foundedItem = null;
    let hosts = JSON.parse(localStorage.getItem("hosts")) || [];
    for (let i = 0; i < hosts.length; i++) {
        if (url.includes(hosts[i].gatewayUrl)) {
            foundedItem = hosts[i];
        }
    }

    return foundedItem;
}

function saveActiveHost(host) {
    localStorage.setItem('activeHost', JSON.stringify(host));
}

function init() {
    chrome.webNavigation.onCompleted.addListener(function (detail) {
        console.log(detail)
        const url = detail.url;
        const activeHost = getActiveHost(url);
        if (activeHost == null
            || !url.includes('apicatalog')
            || url.includes('/login')) {
            return;
        }

        saveActiveHost(activeHost);

      //  alert(url);
        executeContentScript();
    }, {url: [{urlMatches: 'http://*'}, {urlMatches: 'https://*'}]});
}


init();