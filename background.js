'use strict';

const URL_REGEX = /^https?:\/\/(?:[^./?#]+\.)?lvn.broadcom\.net/;
const EXCLUDED_SERVICES_MATHES = ["zosmf", "static"]


function executeContentScript() {
    chrome.tabs.executeScript({
        file: 'contentScript.js'
    })
}

function checkHostnames(url) {
    let isPassed = false;
    // Shows variable
    let hostnames = localStorage.getObj("hostnames") || [];
    for (var i = 0; i < hostnames.length; i++) {
        if (url.includes(hostnames[i].hostUrl)) {
            isPassed = true;
        }
    }

    return isPassed;
}

function init() {
    chrome.webNavigation.onCompleted.addListener(function (detail) {
        console.log(detail)
        const url = detail.url;
        if (!checkHostnames(url)
            || !url.includes('apicatalog')
            || url.includes('/login')) {
            return;
        }

        // if(isExcludeService(url)) {
        //   return;
        // }

        alert(url);
        executeContentScript();
    }, {url: [{urlMatches: 'http://*'}, {urlMatches: 'https://*'}]});
}

function isExcludeService(url) {
    let found = false;
    EXCLUDED_SERVICES_MATHES.forEach(item => {
        if (url.includes(item)) {
            found = true;
        }
    });

    return found;
}

init();

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
