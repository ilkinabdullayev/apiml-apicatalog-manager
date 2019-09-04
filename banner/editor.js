let searchButton = document.getElementById("searchButton");
let searchBarHidden = true;
let fileItem = document.getElementById("item");

function configureEditor() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night_eighties");
    editor.session.setMode("ace/mode/yaml");
    // editor.session.setValue("text")
    // editor.setReadOnly(false)
    // editor.execCommand("find");
    // editor.searchBox.hide();
    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        maxLines: Infinity,
        minLines: 52,
        showPrintMargin: false
        // wrap: true,
    });

}

function getApiDefContent() {
    // get('https://usilca32.lvn.broadcom.net:1443/zosmf/restfiles/fs?path=/z/masserv/mfaas/runtime/testb/zosmf.yml'
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
    data.forEach((item) => {
        if (item.name.includes("yml") || item.name.includes(".properties")) {
            li += '<li class="list-group-item" ><a id="fileItem' + count + '" class="nav-link" href="#item">' + item.name + '</li>'
            count+=1;
        }
    });

    let ul = document.getElementById("ussFiles");
    ul.innerHTML = li;

}

getApiDefContent();
configureEditor();

searchButton.onclick = function() {

    var editor = ace.edit("editor");
    editor.execCommand("find");
    if (searchBarHidden) {
        editor.searchBox.show();
        // editor.execCommand("find");
        searchBarHidden = false;
    } else if (!searchBarHidden) {
        // editor.searchBox.hide();
        searchBarHidden = true;
    }
}

fileItem.onclick = function(event) {
    ace.edit("editor").setValue("");
    event.preventDefault();
}
