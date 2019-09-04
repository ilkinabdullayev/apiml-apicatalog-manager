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


function findJsonItem(array, key) {
    let foundedItem = [];
    array.forEach(item => {
        if(item.key == key) {
            foundedItem =  item.value;
        }
    });

    return foundedItem;
}

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

function getApiDef(url, onComplete) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.setRequestHeader("Authorization", "Basic dGFiYW4wMzpuZXJvMjQwNw==");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", '' );
    xhttp.onload = function() {
        if(xhttp.status == "200") {
            console.log('jsonResponse', xhttp.responseText);
            onComplete(xhttp);
        }
    };

    xhttp.send();
}