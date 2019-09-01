'use strict';

const URL_REGEX = /^https?:\/\/(?:[^./?#]+\.)?lvn.broadcom\.net/;
const EXCLUDED_SERVICES_MATHES = ["zosmf", "static"]

var x = document.getElementsByTagName("body")[0];

console.log(x);

//when tab content is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    //because client can call the url which should be redirected; /dashboard -> /login
    setTimeout(function () {
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            function(tabs){
                const url = tabs[0].url;
                console.log('tab', tabs[0]);
                console.log('changeInfo.status', changeInfo.status);
                 if (url !== undefined && changeInfo.status == "complete") {
                     //check the hostnames too

                     if(!url.includes('https://localhost:10010')
                         || !url.includes('apicatalog')
                         || url.includes('/login')) {
                       return;
                     }

                     // if(isExcludeService(url)) {
                     //   return;
                     // }

                   //  alert(tabs[0].url);
                   //   chrome.tabs.executeScript({
                   //       file: 'contentScript.js'
                   //   });

                     let urlPatches = url.split("/");
                     chrome.tabs.sendMessage(tabs[0].id,
                         {
                             serviceId: urlPatches[urlPatches.length - 1]
                         }
                         , null);
                 }
            }
        );
    }, 3000);
});

function checkHostnames(url) {
    let isPassed = false;
    chrome.storage.sync.get("hostnames", function(result){
        // Shows variable
        let hostnames = result.hostnames || [];
        hostnames.forEach(item => {
            if(url.includes(item.hostUrl)) {
                isPassed = true;
            }
        });
    });

    return isPassed;
}

function isExcludeService(url) {
  let found = false;
  EXCLUDED_SERVICES_MATHES.forEach(item => {
    if(url.includes(item)) {
       found = true;
    }
  });

  return found;
}


