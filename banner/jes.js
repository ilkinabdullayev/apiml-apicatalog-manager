const JES_SHELL = document.getElementById("jesShell");
const JES_SHELL_LOAD = document.querySelectorAll("#jes-panel .loading")[0];
const START_STOP_BUTTON = document.getElementById("startStopButton");
const STDOUT_ID_HIDDEN_INPUT = document.getElementById('stdoutId');

function fillShell(jobName, jobId) {
    clearShell();
    showLoading();
    addItemToJES('Please wait. It\'s fetching from service...');

    const stdoutId = STDOUT_ID_HIDDEN_INPUT.value;
    callZOSMF('/restjobs/jobs/' + jobName + '/' + jobId + '/files/' + stdoutId + '/records',
        'GET',
        response => {
            const data = response.responseText;
            const lines = data.split("\n");

            clearShell();
            lines.forEach(item => {
                addItemToJES(item);
            });

            hideLoading()
        }, error => {
            hideLoading();
            clearShell();
            addItemToJES(error);
        });
}

START_STOP_BUTTON.onclick = function(element) {
    showLoading();
    toggleButton(this);
}


function toggleButton(e) {
    const dataStatus = e.getAttribute('data-status');
    if (dataStatus == 'stopped') {
        e.setAttribute('data-status', 'started');
        e.innerHTML = '<i class="glyphicon glyphicon-stop"></i>\n' +
            '                    &nbsp;\n' +
            '                    Stop';

        startJob();
    } else if (dataStatus == 'started') {
        e.setAttribute('data-status', 'stopped');
        e.innerHTML = '<i class="glyphicon glyphicon-play"></i>\n' +
            '                    &nbsp;\n' +
            '                    Start';

        stopJob();
    }
}

function stopJob() {
    const jobName = document.getElementById("jobNamesDropdown").value;
    const jobId = document.getElementById("jobIdsDropdown").value;
    const tabId = localStorage.getObj('activeTab').tabId;
    const zosmfUrl = localStorage.getObj('activeHost').zosmfUrl;
    chrome.tabs.sendMessage(tabId, {
        action: "stopJob",
        zosmfUrl: zosmfUrl,
        jobName: jobName,
        jobId: jobId
    }, function (res) {
        if (res.status != 'OK') {
            alert(res.message);
        }

        hideLoading();
    });
}

function startJob() {
    const tabId = localStorage.getObj('activeTab').tabId;
    const zosmfUrl = localStorage.getObj('activeHost').zosmfUrl;
    const jobName = document.getElementById("jobNamesDropdown").value;
    chrome.tabs.sendMessage(tabId, {
        action: "startJob",
        zosmfUrl: zosmfUrl,
        jobName: jobName
    }, function (res) {
        if (res.status != 'OK') {
            alert(res.message);
        }

        hideLoading();
    });
}


function addItemToJES(text) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    JES_SHELL.appendChild(li);
}

function clearShell() {
    while (JES_SHELL.firstChild) {
        JES_SHELL.removeChild(JES_SHELL.firstChild);
    }
}

function showLoading() {
    JES_SHELL_LOAD.style.display = 'block';
}

function hideLoading() {
    JES_SHELL_LOAD.style.display = 'none';
}