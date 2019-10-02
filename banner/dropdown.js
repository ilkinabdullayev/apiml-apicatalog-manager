const JOB_NAMES_DROPDOWN = document.getElementById("jobNamesDropdown");
const JOB_IDS_DROPDOWN = document.getElementById("jobIdsDropdown");
const JOB_FILES_DROPDOWN = document.getElementById("jobFilesDropdown");

let distinctedJobs = [];

function fillJobDropdowns() {
    const jobNamePrefix = localStorage.getObj('activeHost').jobNamePrefix;

    //set Prefix
    document.getElementById('jobNamePrefixLabel').innerText = jobNamePrefix;


    showLoading();
    callZOSMF('/restjobs/jobs?owner=*&prefix=' + jobNamePrefix,
        'GET',
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
            hideLoading();

            if (distinctedJobs.length != 0) {
                JOB_NAMES_DROPDOWN.dispatchEvent(new Event('change'));
            } else {
                initEmptyDropDownList(JOB_NAMES_DROPDOWN, 'No jobs');
                initEmptyDropDownList(JOB_IDS_DROPDOWN, 'No jobs');
                initEmptyDropDownList(JOB_FILES_DROPDOWN, 'No job files');
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

    if (data.status != null) {
        option.setAttribute('data-status', data.status);
    }

    option.innerHTML = data.text;

    select.appendChild(option);
}

function initEmptyDropDownList(select, text) {
    addElementToDropdownList(select, {
        value: '',
        text: text,
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

    toggleButtonStatus(this.options[this.selectedIndex]);

    showLoading();
    callZOSMF('/restjobs/jobs/' + jobName + '/' + jobId + '/files',
        'GET',
        (response) => {
            const jobFiles = JSON.parse(response.responseText);

            clearDrowdown(JOB_FILES_DROPDOWN);
            for (const index in jobFiles) {
                addElementToDropdownList(
                    JOB_FILES_DROPDOWN,
                    {
                        value: jobFiles[index].id,
                        text: jobFiles[index].ddname,
                        status: null
                    });
            }

            findSTDOUT(jobFiles);
            hideLoading();
            JOB_FILES_DROPDOWN.dispatchEvent(new Event('change'));
        },
        error => {
            clearShell();
            addItemToJES('Get files error for ' + jobName + ':' + jobId);
            hideLoading();
        });
}

function onChangeJobFilesDropdown() {
    const jobName = JOB_NAMES_DROPDOWN.value;
    const jobId = JOB_IDS_DROPDOWN.value;
    const jobFileId = JOB_FILES_DROPDOWN.value;
    console.info('jobName', jobName)
    console.info('jobId', jobId)
    console.info('jobFileId', jobFileId)
    if (jobName == '' || jobId == '' || jobFileId == '') {
        return;
    }

    fillShell(jobName, jobId, jobFileId);
}

function toggleButtonStatus(e) {
    const startStopButton = document.getElementById("startStopButton");
    const dataStatus = e.getAttribute('data-status');
    if (dataStatus == 'ACTIVE') {
        startStopButton.setAttribute('data-status', 'started');
        startStopButton.innerHTML = '<i class="glyphicon glyphicon-stop"></i>\n' +
            '                    &nbsp;\n' +
            '                    Stop';
    } else {
        startStopButton.setAttribute('data-status', 'stopped');
        startStopButton.innerHTML = '<i class="glyphicon glyphicon-play"></i>\n' +
            '                    &nbsp;\n' +
            '                    Start';
    }
}


function findSTDOUT(jobFiles) {
    for (const index in jobFiles) {
        if (jobFiles[index].ddname == 'STDOUT') {
            JOB_FILES_DROPDOWN.options[index].selected = true;
            return;
        }
    }
}

fillJobDropdowns();

JOB_NAMES_DROPDOWN.addEventListener("change", onChangeJobNamesDropdown);
JOB_IDS_DROPDOWN.addEventListener("change", onChangeJobIdsDropdown);
JOB_FILES_DROPDOWN.addEventListener("change", onChangeJobFilesDropdown);