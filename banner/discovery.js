//Eureka
let select = document.getElementById('discoveryDropdown');
let refreshButton = document.getElementById('refreshDiscovery');

function initializeEureka() {
    const discoveryUrl = localStorage.getObj('activeHost').discoveryUrl;
    get(discoveryUrl + '/eureka/apps',
        (response) => {
            const jsonResponse = JSON.parse(response.responseText);

            const jsonViewer = new JSONViewer();
            document.getElementById('eurekaInstancesViewer').appendChild(jsonViewer.getContainer());
            jsonViewer.showJSON(jsonResponse);
            fillDropdownBar(jsonResponse)
        });
}

initializeEureka();

function fillDropdownBar(response) {
    let applications = response.applications.application;
    let servicesName = [];
    applications.forEach((item) => {
        servicesName.push(item.name)
    });
    addElementToDropdownBar(servicesName);
}

function addElementToDropdownBar(data) {
    let dropdown = document.getElementById('discoveryDropdown');
    data.forEach((item) => {
        let opt = document.createElement('option');
        opt.innerHTML = item;
        dropdown.appendChild(opt);
    })
}

select.onchange = function (event) {
    let serviceId = this.value;
    changeEureka(serviceId);
}

function changeEureka(serviceId) {
    const discoveryUrl = localStorage.getObj('activeHost').discoveryUrl;
    get(discoveryUrl + '/eureka/apps/' + serviceId,
        (response) => {
            const jsonResponse = JSON.parse(response.responseText);
            const jsonViewer = new JSONViewer();
            document.getElementById('eurekaInstancesViewer').innerHTML = "";
            document.getElementById('eurekaInstancesViewer').appendChild(jsonViewer.getContainer());
            jsonViewer.showJSON(jsonResponse);
            console.log(jsonResponse)
        });
}

refreshButton.onclick = function () {
    const discoveryUrl = localStorage.getObj('activeHost').discoveryUrl;

    request("POST", discoveryUrl + '/discovery/api/v1/staticApi',
        () => {alert("Static API definitions have been refreshed!")},
        () => {alert("Something went wrong while trying to refresh Static API definitions")});
}
