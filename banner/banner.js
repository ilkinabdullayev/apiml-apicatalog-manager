const JES_SHELL = document.getElementById("jesShell");
const JOBS_DROPDOWN = document.getElementById("jobsDropdown");

function get(url, onComplete) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.setRequestHeader("Authorization", "Basic YWJkaWwwMTpqZXRvbjMyMQ==");
    xhttp.setRequestHeader("Accept", "application/json");
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
    get('https://usilca32.ca.com:60004/api/v1/jobs/MAS2BAC1/STC24651/files/103/content',
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
    get('https://usilca32.ca.com:60004/api/v1/jobs?owner=*&prefix=MAS2*',
    (response) => {
        const jsonResponse = JSON.parse(response.responseText);
        const data = jsonResponse.items;

        for(var index in data) {
            addElementToDropdownList(data[index].jobName);
        }
    });
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
    JES_SHELL.appendChild(li);
}

function clearShell() {
    while(JES_SHELL.firstChild ){
        JES_SHELL.removeChild(JES_SHELL.firstChild);
    }
}

fillJobDropdowns();
fillShell();


//Eureka
function initializeEureka() {
    let serviceId = getParamValue('serviceId');
    serviceId = (serviceId == 'dashboard') ? '' : '/' + serviceId;
    get('https://localhost:10011/eureka/apps' + serviceId,
    (response) => {
        const jsonResponse = JSON.parse(response.responseText);

        const jsonViewer = new JSONViewer();
        document.getElementById('eureka-panel').appendChild(jsonViewer.getContainer());
        jsonViewer.showJSON(jsonResponse);
    });
}

initializeEureka();

//General Utils
function getParamValue(paramName) {
    let url = window.location.search.substring(1); //get rid of "?" in querystring
    let qArray = url.split('&'); //get key-value pairs
    for (const i = 0; i < qArray.length; i++) {
        let pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName)
            return pArr[1]; //return value
    }
}