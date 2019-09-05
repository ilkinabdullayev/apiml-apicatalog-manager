let addHostnameButton = document.getElementById('addHostnameButton');

addHostnameButton.onclick = function(element) {
    const hostnameInputText = document.getElementById('hostnameInputText');
    const hostUrlInputText = document.getElementById('hostUrlInputText');

    const hostname = hostnameInputText.value;
    const hostUrl = hostUrlInputText.value;

    if (hostname.trim() == '' || hostUrl.trim() == '') {
        return;
    }

    let hostnames = localStorage.getObj("hostnames") || [];
    hostnames.push({
        hostname: hostname,
        hostUrl: hostUrl
    });

    localStorage.setObj("hostnames", hostnames);

    hostnameInputText.value = '';
    hostUrlInputText.value = '';
    initTable(hostnames);
}


function initTable(hostnames) {
    const hostnameTable = document.getElementById('hostnameTable')
    const hostnameTableBody = hostnameTable.getElementsByTagName('tbody')[0];

    let hostnameTableContent = '';
    if (hostnames.length == 0) {
        hostnameTableContent = "There's no hostname configured";
    } else {
        console.log(hostnames)
        hostnames.forEach(item => {
            hostnameTableContent += '<tr><td>' + item.hostname + '</td><td>' + item.hostUrl + '</td></tr>'
        });
    }

    hostnameTableBody.innerHTML = hostnameTableContent;
}

function init() {
    let hostnames = localStorage.getObj("hostnames") || [];
    initTable(hostnames);
}

init();