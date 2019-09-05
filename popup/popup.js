'use strict';

const NAVIGATE_BUTTONS = document.getElementById('navigateButtons');

function init() {
    let hosts = JSON.parse(localStorage.getItem("hosts")) || [];
    if (hosts.length == 0) {
        let button = document.createElement('button');
        button.setAttribute('class', 'btn btn-warning btn-sm');
        button.setAttribute('style', 'width: 100%;margin-bottom: 5px');
        button.innerHTML = '<i class="glyphicon glyphicon-cog"></i>\n' +
            '                    &nbsp;\n' +
            '                    Configuration is need';

        button.onclick = function(){
            chrome.tabs.update({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
        };

        NAVIGATE_BUTTONS.appendChild(button);

        document.getElementById('popupActionFooter').style.display = 'none';
    }


    for (var i = 0; i < hosts.length; i++) {
        let button = document.createElement('button');
        button.setAttribute('data-url', hosts[i].gatewayUrl);
        button.setAttribute('class', 'btn btn-success btn-sm');
        button.setAttribute('style', 'width: 100%;margin-bottom: 5px');
        button.innerText = hosts[i].gatewayUrl;

        button.onclick = function(){
            chrome.tabs.update(null, { url: this.getAttribute('data-url') + '/ui/v1/apicatalog'});
        };

        NAVIGATE_BUTTONS.appendChild(button);
    }
}
init();