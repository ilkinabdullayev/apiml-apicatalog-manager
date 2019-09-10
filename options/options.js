let addHostButton = document.getElementById('addHostButton');

addHostButton.onclick = function() {
    const hostnameInputText = document.getElementById('hostnameInputText');
    const gatewayUrlInputText = document.getElementById('gatewayUrlInputText');
    const zosmfUrlInputText = document.getElementById('zosmfUrlInputText');
    const jobNamePrefixInputText = document.getElementById('jobNamePrefixInputText');
    const staticFilesDirectoryInputText = document.getElementById('staticFilesDirectoryInputText');

    const hostname = hostnameInputText.value;
    const gatewayUrl = gatewayUrlInputText.value;
    const zosmfUrl = zosmfUrlInputText.value;
    const jobNamePrefix = jobNamePrefixInputText.value;
    const staticFilesDirectory = staticFilesDirectoryInputText.value;

    if (hostname.trim() == ''
        || gatewayUrl.trim() == ''
        || zosmfUrl.trim() == ''
        || jobNamePrefix.trim() == ''
        || staticFilesDirectory.trim() == '') {
        alert('Fill all blanks')
        return;
    }

    let hosts = localStorage.getObj("hosts") || [];
    hosts.push({
        hostname: hostname,
        gatewayUrl: gatewayUrl,
        zosmfUrl: zosmfUrl,
        jobNamePrefix: jobNamePrefix,
        staticFilesDirectory: staticFilesDirectory
    });

    localStorage.setObj("hosts", hosts);

    hostnameInputText.value = '';
    gatewayUrlInputText.value = '';
    zosmfUrlInputText.value = '';
    jobNamePrefixInputText.value = '';
    staticFilesDirectoryInputText.value = '';
    initTable(hosts);
}


function initTable(hosts) {
    const hostTable = document.getElementById('hostTable')
    const hostTableBody = hostTable.getElementsByTagName('tbody')[0];

    let hostTableContent = '';
    if (hosts.length == 0) {
        hostTableContent = "<tr><td colspan=\"5\">There's no hostname configured</td></tr>";
    } else {
        hosts.forEach(item => {
            hostTableContent += '<tr><td>' + item.hostname + '</td><td>' + item.gatewayUrl + '</td><td>' + item.zosmfUrl + '</td><td>' + item.jobNamePrefix + '</td><td>' + item.staticFilesDirectory + '</td></tr>'
        });
    }

    hostTableBody.innerHTML = hostTableContent;
}

function init() {
    let hosts = localStorage.getObj("hosts") || [];
    initTable(hosts);
}

init();