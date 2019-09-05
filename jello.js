function addBanner(serviceId) {
    let iFrame = document.createElement("iframe");
    iFrame.setAttribute("id", "actionFrame");
    iFrame.style.width = "100%";
    iFrame.style.height = "540px";
    iFrame.style.border = "none"
    iFrame.src = "banner/append_banner.html?serviceId=" + serviceId;

    const content =  document.getElementById('content');
    content.appendChild(iFrame);
}

function init() {
    const serviceId = getParamValue('serviceId');
    addBanner(serviceId);
}

init();