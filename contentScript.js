const body = document.body;
//alert(x.outerHTML);
let lastActivePage;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.serviceId != lastActivePage) {
        console.log('lastActivePage', lastActivePage);
        lastActivePage = request.serviceId;

        clearConsole();
        alert(request.serviceId);
        addConsole(request.serviceId);
    }
});


function addConsole(serviceId) {
    let iFrame  = document.createElement("iframe");
    iFrame.setAttribute("id", "actionFrame");
    iFrame.style.width = "100%";
    iFrame.style.height = "540px";
  //  iFrame.style.background = "black";
    iFrame.style.border = "none"
    iFrame.src  = chrome.extension.getURL ("banner/append_banner.html?serviceId=" + serviceId);

    body.appendChild(iFrame);
}

function clearConsole() {
    const actionFrame = document.getElementById('actionFrame');
    if (actionFrame != null) {
        body.removeChild(actionFrame);
    }
}
