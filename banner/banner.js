const JES_SHELL = document.getElementById("jesShell");

function fillShell() {
    get('https://localhost:8443/api/v1/jobs/MAS2BAC1/STC62065/files/103/content',
        (response) => {
            const jsonResponse = JSON.parse(response.responseText);
            const data = jsonResponse.content;
            const lines = data.split("\n");
            clearShell();

            lines.forEach((item, index) => {
                addItemToJES(item);
            });
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

fillShell();


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (!msg.displayConsole) {
        JES_SHELL.hidden = !msg.displayConsole;
    } else JES_SHELL.hidden = false;

});