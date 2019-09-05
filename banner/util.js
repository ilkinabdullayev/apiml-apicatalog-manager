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
        if(item.key == key) {
            foundedItem =  item.value;
        }
    });

    return foundedItem;
}

function get(url, onComplete, onFail) {
    request('GET', url, onComplete, onFail);
}

function del(url, onComplete, onFail) {
    request('DELETE', url, onComplete, onFail);
}

function put(url, onComplete, onFail) {
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open('PUT', url);
        xhttp.setRequestHeader("Authorization", "Basic YXBpbXRzdDp0c3RtaXBhMQ==");
        xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", "");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send("Your JSON Data Here");

        xhttp.onload = function () {
            if (xhttp.status == "200") {
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

        xhttp.onerror = function(e){
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


function request(method, url, onComplete, onFail) {
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open(method, url);
        xhttp.setRequestHeader("Authorization", "Basic YXBpbXRzdDp0c3RtaXBhMQ==");
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

        xhttp.onerror = function(e){
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
    // xhttp.send("Your JSON Data Here");
}


Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
function getApiDef(url, onComplete) {
    let xhttp = new XMLHttpRequest();
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

function getApiDefContentFile(url, onComplete) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.setRequestHeader("Authorization", "Basic dGFiYW4wMzpuZXJvMjQwNw==");
    xhttp.setRequestHeader("X-CSRF-ZOSMF-HEADER", '' );
    xhttp.setRequestHeader("X-IBM-Data-Type", 'binary' );
    xhttp.onload = function() {
        if(xhttp.status == "200") {
            console.log('jsonResponse', xhttp.responseText);
            onComplete(xhttp);
        }
    };

    xhttp.send();
}

