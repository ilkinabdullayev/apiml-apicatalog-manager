const JES_SHELL = document.getElementById("jesShell");
const JES_SHELL_LOAD = document.querySelectorAll("#jes-panel .loading")[0];
const START_STOP_BUTTON = document.getElementById("startStopButton");
const STDOUT_ID_HIDDEN_INPUT = document.getElementById('stdoutId');

function fillShell(jobName, jobId) {
    clearShell();
    showLoading();
    addItemToJES('Please wait. It\'s fetching from service...');

    const stdoutId = validateStdoutId();
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

    stopJob();
}


function toggleButton(e) {
    const dataStatus = e.getAttribute('data-status');
    if (dataStatus == 'stopped') {
        e.setAttribute('data-status', 'started');
        e.innerHTML = '<i class="glyphicon glyphicon-stop"></i>\n' +
            '                    &nbsp;\n' +
            '                    Stop';
    } else if (dataStatus == 'started') {
        e.setAttribute('data-status', 'stopped');
        e.innerHTML = '<i class="glyphicon glyphicon-play"></i>\n' +
            '                    &nbsp;\n' +
            '                    Start';
    }
}

function stopJob() {
    const jobName = document.getElementById("jobNamesDropdown").value;
    const jobId = document.getElementById("jobIdsDropdown").value;
    del('https://ca32.ca.com:1443/zosmf/restjobs/jobs/' + jobName + '/' + jobId,
        response => {
            hideLoading();
        }, error => {
            hideLoading();
            alert(error);
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

function validateStdoutId() {
    if (STDOUT_ID_HIDDEN_INPUT.value == '') {
        return 103;
    }

    return STDOUT_ID_HIDDEN_INPUT.value;
}