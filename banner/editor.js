let searchButton = document.getElementById("searchButton");
let saveButton = document.getElementById("saveButton");
let searchBarHidden = true;

let fileName = "";

function configureEditor() {
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night_eighties");
    editor.session.setMode("ace/mode/yaml");
    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        maxLines: Infinity,
        minLines: 52,
        showPrintMargin: false
    });

}

function getApiDefContentFileName() {
    getApiDef('https://usilca32.lvn.broadcom.net:1443/zosmf/restfiles/fs?path=/z/masserv/taban03/dev/instance/api-defs',
        (response) => {
            const jsonResponse = JSON.parse(response.responseText);
            const data = jsonResponse.items;

            addItemsToLeftSidePanel(data);
    });
}

function addItemsToLeftSidePanel(data) {
    let li = '';
    let count = 0;
    let ul = document.getElementById("ussFiles");
    data.forEach((item) => {
        if (item.name.includes("yml") || item.name.includes(".properties")) {
            li += '<li class="list-group-item" ><a id="fileItem' + count + '" class="fileItem" href="#item">' + item.name + '</li>'
            console.log('fileItem'+count)
            count+=1;
        }
    });

    ul.innerHTML = li;

    changeFile(ul);
}

getApiDefContentFileName();
configureEditor();

searchButton.onclick = function() {

    let editor = ace.edit("editor");
    editor.execCommand("find");
    if (searchBarHidden) {
        editor.searchBox.show();
        searchBarHidden = false;
    } else if (!searchBarHidden) {
        searchBarHidden = true;
    }
}

function changeFile(ul) {
    ul.onclick = function(event) {
        fileName = event.target.innerText;
        getFileContent(event.target.innerText);
        event.preventDefault();
    };
}

function getFileContent(clickedElement) {
     getApiDefContentFile('https://usilca32.lvn.broadcom.net:1443/zosmf/restfiles/fs/z/masserv/taban03/dev/instance/api-defs/' + clickedElement,
        (response) => {
         console.log(response.responseText)
         fillTextAreaWithFile(response.responseText.toString());
        });
}

function fillTextAreaWithFile(data) {
    ace.edit("editor").setValue(data);
    event.preventDefault();
}

saveButton.onclick = function() {
    console.log(fileName)
    request('PUT','https://usilca32.lvn.broadcom.net:1443/zosmf/restfiles/fs/z/masserv/taban03/dev/instance/api-defs/' + fileName,
        () => alert("File uploaded correctly!"),
        () => alert("Something went wrong while uploading the file!"),
        )
}

