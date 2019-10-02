//General Utils
function getParamValue(paramName) {
    let url = window.location.search.substring(1); //get rid of "?" in querystring
    let qArray = url.split('&'); //get key-value pairs
    for (let i = 0; i < qArray.length; i++) {
        let pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName)
            return pArr[1]; //return value
    }
}


function findJsonItem(array, key) {
    let foundedItem = [];
    array.forEach(item => {
        if (item.key == key) {
            foundedItem = item.value;
        }
    });

    return foundedItem;
}

function callZOSMF(path, method, onComplete, onFail) {
    const zosmfUrl = localStorage.getObj('activeHost').zosmfUrl;
    if (method == 'GET') {
        get(zosmfUrl + '/zosmf' + path, onComplete, onFail);
    } else if (method == 'DELETE') {
        del(zosmfUrl + '/zosmf' + path, onComplete, onFail);
    }
}

function get(url, onComplete, onFail) {
    request('GET', url, onComplete, onFail);
}

function del(url, onComplete, onFail) {
    request('DELETE', url, onComplete, onFail);
}

function request(method, url, onComplete, onFail) {
    const basicDigest = localStorage.getObj('activeHost').basicDigest;

    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open(method, url);
        xhttp.setRequestHeader("Authorization", "Basic " + basicDigest);
        xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", "");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.onload = function () {
            if (xhttp.status == "200" || xhttp.status == "202") {
                console.log('jsonResponse', xhttp.responseText);
                onComplete(xhttp);
            } else {
                console.log("Error", xhttp.statusText);
                if (typeof onFail === "function") {
                    onFail(xhttp.statusText);
                }
            }
        };

        xhttp.ontimeout = function () {
            if (typeof onFail === "function") {
                onFail('Timeout problem');
            }
        }

        xhttp.onerror = function (e) {
            if (typeof onFail === "function") {
                onFail('Unknown Error Occured. Server response not received.');
            }
        };

        xhttp.send();
    } catch (e) {
        if (typeof onFail === "function") {
            onFail('Unknown Error Occured. Server response not received.');
        }
    }
}

function getApiDef(path, onComplete) {
    const {zosmfUrl, basicDigest} = localStorage.getObj('activeHost');

    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', zosmfUrl + '/zosmf' + path);
    xhttp.setRequestHeader("Authorization", "Basic " + basicDigest);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", '');
    xhttp.onload = function () {
        if (xhttp.status == "200") {
            console.log('jsonResponse', xhttp.responseText);
            onComplete(xhttp);
        }
    };

    xhttp.send();
}

function getApiDefContentFile(path, onComplete) {
    const {zosmfUrl, basicDigest} = localStorage.getObj('activeHost');

    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', zosmfUrl + '/zosmf' + path);
    xhttp.setRequestHeader("Authorization", "Basic " + basicDigest);
    xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", '');
    xhttp.setRequestHeader("X-IBM-Data-Type", 'binary');
    xhttp.onload = function () {
        if (xhttp.status == "200") {
            console.log('jsonResponse', xhttp.responseText);
            onComplete(xhttp);
        }
    };

    xhttp.send();
}

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}


