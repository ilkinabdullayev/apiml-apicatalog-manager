const body = document.body;

function addBanner(serviceId) {
    let iFrame  = document.createElement("iframe");
    iFrame.setAttribute("id", "actionFrame");
    iFrame.style.width = "100%";
    iFrame.style.height = "540px";
  //  iFrame.style.background = "black";
    iFrame.style.border = "none"
    iFrame.src  = chrome.extension.getURL ("content.html?serviceId=" + serviceId);

    body.appendChild(iFrame);
}

function removeBanner() {
    const actionFrame = document.getElementById('actionFrame');
    if (actionFrame != null) {
        body.removeChild(actionFrame);
    }
}

function registerListener() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        removeBanner();
        alert(request.serviceId);
        addBanner(request.serviceId);
    });
}

registerListener();
