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