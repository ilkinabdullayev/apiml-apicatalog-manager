let addHostButton = document.getElementById('addHostButton');

addHostButton.onclick = function() {
    const hostnameInputText = document.getElementById('hostnameInputText');
    const gatewayUrlInputText = document.getElementById('gatewayUrlInputText');
    const discoveryUrlInputText = document.getElementById('discoveryUrlInputText');

    const zosmfUrlInputText = document.getElementById('zosmfUrlInputText');
    const zosmfUsernameInputText = document.getElementById('zosmfUsernameInputText');
    const zosmfPasswordInputText = document.getElementById('zosmfPasswordInputText');
    const jobNamePrefixInputText = document.getElementById('jobNamePrefixInputText');
    const staticFilesDirectoryInputText = document.getElementById('staticFilesDirectoryInputText');

    const hostname = hostnameInputText.value;
    const gatewayUrl = gatewayUrlInputText.value;
    const discoveryUrl = discoveryUrlInputText.value;

    const zosmfUrl = zosmfUrlInputText.value;
    const username = zosmfUsernameInputText.value;
    const password = zosmfPasswordInputText.value;
    const jobNamePrefix = jobNamePrefixInputText.value;
    const staticFilesDirectory = staticFilesDirectoryInputText.value;

    if (hostname.trim() == ''
        || gatewayUrl.trim() == ''
        || discoveryUrl.trim() == ''
        || zosmfUrl.trim() == ''
        || username.trim() == ''
        || password.trim() == ''
        || jobNamePrefix.trim() == ''
        || staticFilesDirectory.trim() == '') {
        alert('Fill all blanks')
        return;
    }

    let hosts = localStorage.getObj("hosts") || [];
    if (isConfigurationExist(hosts, hostname)) {
        alert('Configuration is already saved. Change host name')
        return;
    }


    hosts.push({
        hostname: hostname,
        gatewayUrl: gatewayUrl,
        discoveryUrl: discoveryUrl,
        zosmfUrl: zosmfUrl,
        basicDigest: btoa(username + ':' + password),
        jobNamePrefix: jobNamePrefix,
        staticFilesDirectory: staticFilesDirectory
    });

    localStorage.setObj("hosts", hosts);

    hostnameInputText.value = '';
    gatewayUrlInputText.value = '';
    discoveryUrlInputText.value = '';
    zosmfUrlInputText.value = '';
    zosmfUsernameInputText.value = '';
    zosmfPasswordInputText.value = '';
    jobNamePrefixInputText.value = '';
    staticFilesDirectoryInputText.value = '';

    initTable(hosts);
}


function initTable(hosts) {
    const hostTable = document.getElementById('hostTable')
    const hostTableBody = hostTable.getElementsByTagName('tbody')[0];

    let hostTableContent = '';
    if (hosts.length == 0) {
        hostTableContent = "<tr><td colspan=\"7\">There's no hostname configured</td></tr>";
    } else {
        hosts.forEach(item => {
            hostTableContent +=
                '<tr><td>' + item.hostname + '</td>' +
                '<td>' + item.gatewayUrl + '</td>' +
                '<td>' + item.discoveryUrl + '</td>' +
                '<td>' + item.zosmfUrl + '</td>' +
                '<td>' + item.jobNamePrefix + '</td>' +
                '<td>' + item.staticFilesDirectory + '</td>' +
                '<td>' +
                '<div class="btn-group btn-group-sm">\n' +
                '    <button style="display: none" type="button" class="btn btn-primary" data-key="' + item.hostname + '" data-operation="edit"><i class="glyphicon glyphicon-pencil"></i> </button>\n' +
                '    <button type="button" class="btn btn-danger" data-key="' + item.hostname + '"  data-operation="delete"><i class="glyphicon glyphicon-trash"></i> </button>\n' +
                '</div></td></tr>'
        });
    }

    hostTableBody.innerHTML = hostTableContent;

    initConfigurationEvent();
}

function isConfigurationExist(hosts, hostname) {
    let foundedItemIndex = getConfigurationIndex(hosts, hostname);
    return foundedItemIndex > -1;
}

function getConfigurationIndex(hosts, hostname) {
    let foundedItemIndex = -1;
    for (let i = 0; i < hosts.length; i++) {
        if (hostname == hosts[i].hostname) {
            foundedItemIndex = i;
        }
    }

    return foundedItemIndex;
}


function initConfigurationEvent() {
    document.querySelectorAll('#hostTable tbody')[0].onclick = function (event) {
        let target = event.target;
        if (target.nodeName == 'I') {
            target = target.parentElement;
        }

        const operation = target.getAttribute('data-operation');
        if (operation == 'delete') {
            const r = confirm("Are you sure?");
            if (r == true) {
                const key = target.getAttribute('data-key');
                const hosts = localStorage.getObj("hosts") || [];
                const foundedIndex = getConfigurationIndex(hosts, key);
                hosts.splice(foundedIndex, 1);

                localStorage.setObj("hosts", hosts);
                initTable(hosts);
            }
        } else if (operation == 'edit') {

        }
    }
}

function init() {
    let hosts = localStorage.getObj("hosts") || [];
    initTable(hosts);
}

init();