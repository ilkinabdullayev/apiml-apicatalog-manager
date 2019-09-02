//Static Instances
function initializeEurekaStaticInstances() {
    let serviceId = getParamValue('serviceId');
    serviceId = (serviceId == 'dashboard') ? '' : serviceId;
    get('https://localhost:10011/discovery/api/v1/staticApi',
        (response) => {
            const jsonResponse = JSON.parse(response.responseText);

            const jsonViewer = new JSONViewer();
            document.getElementById('si-panel').appendChild(jsonViewer.getContainer());
            jsonViewer.showJSON(jsonResponse);
        });
}

initializeEurekaStaticInstances();