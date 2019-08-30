'use strict';

const URL_REGEX = /^https?:\/\/(?:[^./?#]+\.)?lvn.broadcom\.net/;
const EXCLUDED_SERVICES_MATHES = ["zosmf", "static"]

var x = document.getElementsByTagName("body")[0];

console.log(x);


//when tab content is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  const url = tab.url;
  console.log('tab', tab);
  console.log('changeInfo.status', changeInfo.status);
  if (url !== undefined && changeInfo.status == "complete") {
      //check the hostname too
      if(!url.includes('apicatalog')) {
        return;
      }

      if(isExcludeService(url)) {
        return;
      }

     //alert(url);
     /*chrome.tabs.executeScript(null, {
       code: "alert('xiyar');"
     });*/

  }
});

function isExcludeService(url) {
  let found = false;
  EXCLUDED_SERVICES_MATHES.forEach((item, index) => {
    if(url.includes(item)) {
       found = true;
    }
  });

  return found;
}


