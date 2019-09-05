const body = document.body;

function addBanner(section, serviceId) {
    let iFrame  = document.createElement("iframe");
    iFrame.setAttribute("id", "actionFrame");
    iFrame.style.width = "100%";
    iFrame.style.height = "540px";
  //  iFrame.style.background = "black";
    iFrame.style.border = "none"
    iFrame.src  = chrome.extension.getURL ("banner/append_banner.html?serviceId=" + serviceId);

    section.appendChild(iFrame);
}

function init() {
    const url = location.href;
    const urlPatches = url.split("/");
    const serviceId = urlPatches[urlPatches.length - 1];

    const content = document.createElement('div');
    content.setAttribute('id', 'content')
    content.setAttribute("style", "position:absolute;width:100%;z-index:1000000!important")
    content.innerHTML = '<button id="fullScreenButton" data-status="not-fulled" type="button" class="btn btn-primary btn-sm" style="position: absolute;top: 5px; right: 5px">\n' +
        '        <i class="glyphicon glyphicon-resize-full"></i>\n' +
        '    </button>';


    const link = document.createElement("link");
    link.href = chrome.extension.getURL("statics/bootstrap.min.css");
    link.type = "text/css";
    link.rel = "stylesheet";

    content.appendChild(link);
    addBanner(content, serviceId);

    const root = document.getElementById('root');
    root.appendChild(content);

    //alert('jello'+serviceId);


    document.getElementById('fullScreenButton').onclick = function(element) {
        let iFrame  = document.getElementById("actionFrame");
        const status = this.getAttribute('data-status');
        if (status == 'not-fulled') {
            content.style.top = "0px";
            iFrame.style.height = "100vh";
            this.setAttribute('data-status', 'full-fulled');
            this.innerHTML = '<i class="glyphicon glyphicon-resize-small"></i>';
        } else {
            this.setAttribute('data-status', 'not-fulled');
            this.innerHTML = '<i class="glyphicon glyphicon-resize-full"></i>';
            content.style.top = null;
            iFrame.style.height = "540px";
        }
      //  alert('')


    }
}

init();
