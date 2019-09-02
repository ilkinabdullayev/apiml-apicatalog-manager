const JOB_NAMES_DROPDOWN = document.getElementById("jobNamesDropdown");

function fillJobDropdowns() {
    get('https://localhost:8443/api/v1/jobs?owner=*&prefix=MAS2*',
        (response) => {
            const jsonResponse = JSON.parse(response.responseText);
            const data = jsonResponse.items;


            let distinctedJobs = [];
            for(const index in data) {
                const jobname = data[index].jobName;
                const existedJobs = findJsonItem(distinctedJobs, jobname);

                if (existedJobs.length == 0) {
                    addElementToDropdownList(jobname);

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
    JOB_NAMES_DROPDOWN.appendChild(li);
}

fillJobDropdowns();