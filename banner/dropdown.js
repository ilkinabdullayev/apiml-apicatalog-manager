const JOB_NAMES_DROPDOWN = document.getElementById("jobNamesDropdown");
const JOB_IDS_DROPDOWN = document.getElementById("jobIdsDropdown");

let distinctedJobs = [];

function fillJobDropdowns() {
    get('https://ca32.ca.com:1443/zosmf/restjobs/jobs?owner=*&prefix=MAS2*',
        (response) => {
            const data = JSON.parse(response.responseText);
            for (const index in data) {
                const jobname = data[index].jobname;
                const existedJobs = findJsonItem(distinctedJobs, jobname);

                if (existedJobs.length == 0) {
                    addElementToDropdownList(
                        JOB_NAMES_DROPDOWN,
                        {
                            value: jobname,
                            text: jobname,
                            status: data[index].status
                        });

                    distinctedJobs.push({
                        key: jobname,
                        value: [data[index]]
                    });
                } else {
                    existedJobs.push(data[index]);
                    distinctedJobs.push({
                        key: jobname,
                        value: existedJobs
                    });
                }
            }

            console.log('distinctedJobs', distinctedJobs);

            if (distinctedJobs.length != 0) {
                JOB_NAMES_DROPDOWN.dispatchEvent(new Event('change'));
            } else {
                initEmptyDropDownList(JOB_NAMES_DROPDOWN);
                initEmptyDropDownList(JOB_IDS_DROPDOWN);
            }
        },
        error => {
            hideLoading();
            clearShell();
            addItemToJES(error);
        });
}

function addElementToDropdownList(select, data) {
    const option = document.createElement("option");
    option.value = data.value;
    option.setAttribute('data-status', data.status);
    option.innerHTML = data.text;

    select.appendChild(option);
}

function initEmptyDropDownList(select) {
    addElementToDropdownList(select, {
            value: '',
            text: 'No jobs',
            status: ''
        });
}

function clearDrowdown(select) {
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
}

function onChangeJobNamesDropdown() {
    const jobName = this.value;
    if (jobName == '') {
        return;
    }

    const jobIds = findJsonItem(distinctedJobs, jobName);

    clearDrowdown(JOB_IDS_DROPDOWN);
    for (const index in jobIds) {
        addElementToDropdownList(
            JOB_IDS_DROPDOWN,
            {
                value: jobIds[index].jobid,
                text: jobIds[index].jobid + ' - ' + jobIds[index].status,
                status: jobIds[index].status
            });
    }

    JOB_IDS_DROPDOWN.dispatchEvent(new Event('change'));
}


function onChangeJobIdsDropdown() {
    const jobName = JOB_NAMES_DROPDOWN.value;
    const jobId = this.value;
    console.info('jobName', jobName)
    console.info('jobId', jobId)
    if (jobName == '' || jobId == '') {
        return;
    }

    toggleButtonStatus(this.options[this.selectedIndex]);

    showLoading();
    get('https://ca32.ca.com:1443/zosmf/restjobs/jobs/' + jobName + '/' + jobId + '/files',
        (response) => {
            const data = JSON.parse(response.responseText);

            const stdoutId = findSTDOUT(data);
            writeSTDOUTIdToInputHidden(stdoutId);
            fillShell(jobName, jobId);
        },
        error => {
            writeSTDOUTIdToInputHidden(103);
            fillShell(jobName, jobId);
        });
}

function toggleButtonStatus(e) {
    const startStopButton = document.getElementById("startStopButton");
    const dataStatus = e.getAttribute('data-status');
    if (dataStatus == 'ACTIVE') {
        startStopButton.setAttribute('data-status', 'stopped');
        startStopButton.innerHTML = '<i class="glyphicon glyphicon-stop"></i>\n' +
            '                    &nbsp;\n' +
            '                    Stop';
    } else {
        startStopButton.setAttribute('data-status', 'started');
        startStopButton.innerHTML = '<i class="glyphicon glyphicon-play"></i>\n' +
            '                    &nbsp;\n' +
            '                    Start';
    }
}

function writeSTDOUTIdToInputHidden(stdoutId) {
    document.getElementById('stdoutId').value = stdoutId;

}


function findSTDOUT(jobFiles) {
    for (const index in jobFiles) {
        if (jobFiles[index].ddname == 'STDOUT') {
            return jobFiles[index].id;
        }
    }
}

fillJobDropdowns();

JOB_NAMES_DROPDOWN.addEventListener("change", onChangeJobNamesDropdown);
JOB_IDS_DROPDOWN.addEventListener("change", onChangeJobIdsDropdown);