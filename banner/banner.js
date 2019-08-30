const ZOS_SHELL = document.getElementById("zosShell");
const JOBS_DROPDOWN = document.getElementById("jobsDropdown");

function get(url, onComplete) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
  //  xhttp.setRequestHeader("Authorization", "Basic hello");
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
    get('URL',
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

function fillJobDropdowns() {
    get('URL',
    (response) => {
        const jsonResponse = JSON.parse(response.responseText);
        const data = jsonResponse.items;

        for(var index in data) {
            addElementToDropdownList(data[index].jobName);
        }
    });
}

function test() {

}

function addElementToDropdownList(text) {
    const li = document.createElement("li");

    const link = document.createElement('a');
    const linkText = document.createTextNode(text);
    link.appendChild(linkText);

    link.title = text;
    link.href = "#";

    li.appendChild(link);
    JOBS_DROPDOWN.appendChild(li);
}

function addElementToList(text) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    ZOS_SHELL.appendChild(li);
}

function clearShell() {
    while(ZOS_SHELL.firstChild ){
        ZOS_SHELL.removeChild(ZOS_SHELL.firstChild);
    }
}

fillJobDropdowns();
fillShell();