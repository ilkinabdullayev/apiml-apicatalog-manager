let searchButton = document.getElementById("searchButton");
let searchBarHidden = true;
let searchLabel = document.getElementsByClassName("ace_search right");
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
        maxLines: 200,
        minLines: 100,
        showPrintMargin: false
        // wrap: true,
    });

}

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

configureEditor();