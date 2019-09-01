let addHostnameButton = document.getElementById('addHostnameButton');

addHostnameButton.onclick = function(element) {
    const hostnameInputText = document.getElementById('hostnameInputText');
    const hostUrlInputText = document.getElementById('hostUrlInputText');

    const hostname = hostnameInputText.value;
    const hostUrl = hostUrlInputText.value;

    if (hostname.trim() == '' || hostUrl.trim() == '') {
        return;
    }

    chrome.storage.sync.get("hostnames", function(result){
        // Shows variable
        let hostnames = result.hostnames || [];
        hostnames.push({
            hostname: hostname,
            hostUrl: hostUrl
        });

        chrome.storage.sync.set({
            "hostnames" : hostnames
        });

        hostnameInputText.value = '';
        hostUrlInputText.value = '';
        initTable(hostnames);
    });


}

chrome.storage.sync.get("hostnames", function(result){
    // Shows variable
    let hostnames = result.hostnames || [];
    initTable(hostnames);
});

function initTable(hostnames) {
    const hostnameTable = document.getElementById('hostnameTable')
    const hostnameTableBody = hostnameTable.getElementsByTagName('tbody')[0];

    let hostnameTableContent = '';
    if (hostnames.length == 0) {
        hostnameTableContent = "There's no hostname configured";
    } else {
        hostnames.forEach(item => {
            hostnameTableContent += '<tr><td>' + item.hostname + '</td><td>' + item.hostUrl + '</td></tr>'
        });
    }

    hostnameTableBody.innerHTML = hostnameTableContent;
}