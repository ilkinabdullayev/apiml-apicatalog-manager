'use strict';

const URL_REGEX = /^https?:\/\/(?:[^./?#]+\.)?lvn.broadcom\.net/;
const EXCLUDED_SERVICES_MATHES = ["zosmf", "static"]

var x = document.getElementsByTagName("body")[0];

console.log(x);

let lastActivePage = null;

//when tab content is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    //because client can call the url which should be redirected; /dashboard -> /login
    setTimeout(function () {
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            function (tabs) {
                const url = tabs[0].url;
                console.log('tab', tabs[0]);
                console.log('changeInfo.status', changeInfo.status);
                if (url !== undefined && changeInfo.status == "complete") {
                    //check the hostnames too

                    if (!url.includes('https://localhost:10010')
                        || !url.includes('apicatalog')
                        || url.includes('/login')) {
                        return;
                    }

                    // if(isExcludeService(url)) {
                    //   return;
                    // }

                    alert(tabs[0].url);
                    executeContentScript(tabs[0]);
                }
            }
        );
    }, 1000);
});


function executeContentScript(tab) {
    const urlPatches = tab.url.split("/");
    const serviceId = urlPatches[urlPatches.length - 1];

    if (serviceId != lastActivePage) {
        console.log('lastActivePage', lastActivePage);
        if (lastActivePage == null) {
            chrome.tabs.executeScript({
                file: 'contentScript.js'
            });
        }

        setTimeout(function () {

            chrome.tabs.sendMessage(tab.id,
                {
                    serviceId: urlPatches[urlPatches.length - 1]
                }
                , null);
        }, 1000);

        lastActivePage = serviceId;
    }
}

function checkHostnames(url) {
    let isPassed = false;
    chrome.storage.sync.get("hostnames", function (result) {
        // Shows variable
        let hostnames = result.hostnames || [];
        hostnames.forEach(item => {
            if (url.includes(item.hostUrl)) {
                isPassed = true;
            }
        });
    });

    return isPassed;
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


