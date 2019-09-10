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


    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action == "stopJob") {
            stopJob(
                request.zosmfUrl, request.jobName, request.jobId,
                () => {
                    console.log('Success stop job');
                    sendResponse({status: "OK"});
                },
                error => {
                    sendResponse({status: "FAIL"});
                });
        } else if (request.action == "startJob") {
            startJob(
                request.zosmfUrl, request.jobName,
                () => {
                    console.log('Success start job');
                    sendResponse({status: "OK"});
                },
                error => {
                    sendResponse({status: "FAIL", message: error});
                });
        } else if (request.action == "saveFile") {
            saveFile(
                request.zosmfUrl, request.filePath, request.body,
                () => {
                    console.log('Success save file');
                    sendResponse({status: "OK"});
                },
                error => {
                    sendResponse({status: "FAIL", message: error});
                });
        }

        return true;
    });
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


    addLink(content, chrome.extension.getURL("statics/bootstrap.min.css"));
    //
    addBanner(content, serviceId);
    //
    const root = document.getElementById('root');
    if (root != null) {
        root.appendChild(content);
    } else {
        document.body.appendChild(content);
    }
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
    }
}

function addLink(content, url) {
    const link = document.createElement("link");
    link.href = chrome.extension.getURL(url);
    link.type = "text/css";
    link.rel = "stylesheet";

    content.appendChild(link);
}

function addScript(content, url) {
    const script = document.createElement("script");
    script.src = chrome.extension.getURL(url);

    content.appendChild(script);
}


init();

//////
function stopJob(zosmfUrl, jobName, jobId, onComplete, onFail) {
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', zosmfUrl + '/zosmf/restjobs/jobs/' + jobName + '/' + jobId);
        xhttp.setRequestHeader("Authorization", "Basic YXBpbXRzdDp0c3RtaXBhMQ==");
        xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", "");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.onload = function () {
            if (xhttp.status == "200" || xhttp.status == "202") {
                console.log('jsonResponse', xhttp.responseText);
                onComplete();
            } else {
                console.log("Error", xhttp.statusText);
                if (typeof onFail === "function") {
                    onFail(xhttp.statusText);
                }
            }
        };

        xhttp.ontimeout = function () {
            if (typeof onFail === "function") {
                onFail('Timeout problem');
            }
        }

        xhttp.onerror = function(e){
            if (typeof onFail === "function") {
                onFail('Unknown Error Occured. Server response not received.');
            }
        };

        xhttp.send();
    } catch (e) {
        if (typeof onFail === "function") {
            onFail('Unknown Error Occured. Server response not received.');
        }
    }

}

function startJob(zosmfUrl, jobname, onComplete, onFail) {
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open('PUT', zosmfUrl + '/zosmf/restconsoles/consoles/defcn');
        xhttp.setRequestHeader("Authorization", "Basic YXBpbXRzdDp0c3RtaXBhMQ==");
        xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", "");

        xhttp.onload = function () {
            if (xhttp.status == "200") {
                console.log('jsonResponse', xhttp.responseText);
                onComplete();
            } else {
                console.log("Error", xhttp.statusText);
                if (typeof onFail === "function") {
                    onFail(xhttp.statusText);
                }
            }
        };

        xhttp.ontimeout = function () {
            if (typeof onFail === "function") {
                onFail('Timeout problem');
            }
        }

        xhttp.onerror = function(e){
            if (typeof onFail === "function") {
                onFail('Unknown Error Occured. Server response not received.');
            }
        };

        xhttp.send("{\"cmd\":\"s " + jobname + "\"}");
    } catch (e) {
        if (typeof onFail === "function") {
            onFail('Unknown Error Occured. Server response not received.');
        }
    }
}

function saveFile(zosmfUrl, filePath, body, onComplete, onFail) {
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open('PUT', zosmfUrl + '/zosmf' + filePath);
        xhttp.setRequestHeader("Authorization", "Basic YXBpbXRzdDp0c3RtaXBhMQ==");
        xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", "");
        xhttp.setRequestHeader("X-IBM-Data-Type", 'binary');
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.onload = function () {
            if (xhttp.status == "204") {
                console.log('jsonResponse', xhttp.responseText);
                onComplete(xhttp);
            } else {
                console.log("Error", xhttp.statusText);
                if (typeof onFail === "function") {
                    onFail(xhttp.statusText);
                }
            }
        };

        xhttp.ontimeout = function () {
            if (typeof onFail === "function") {
                onFail('Timeout problem');
            }
        }

        xhttp.onerror = function(e){
            if (typeof onFail === "function") {
                onFail('Unknown Error Occured. Server response not received.');
            }
        };

        xhttp.send(body);
    } catch (e) {
        if (typeof onFail === "function") {
            onFail('Unknown Error Occured. Server response not received.');
        }
    }
}
