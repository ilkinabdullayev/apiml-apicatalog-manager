const ZOS_SHELL = document.getElementById("zosShell");

function get(url, onComplete) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.setRequestHeader("Authorization", "Basic digest==");
    xhttp.onload = function() {
        if(xhttp.status == "200") {
            console.log('jsonResponse', xhttp.responseText);
            onComplete(xhttp);
        }
    };

    xhttp.send();
   // xhttp.send("Your JSON Data Here");
}

function fillShell() {
    get('SERVICE_URL',
    (response) => {
        const jsonResponse = JSON.parse(response.responseText);
        const data = jsonResponse.content;
        const lines = data.split("\n");
        clearShell();

        lines.forEach((item, index) => {
            addElementToList(item);
        });
    });
}

function addElementToList(text) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    ZOS_SHELL.appendChild(li);
}

function clearShell() {
    while(ZOS_SHELL.firstChild ){
        ZOS_SHELL.removeChild(ZOS_SHELL.firstChild);
    }
}

fillShell();