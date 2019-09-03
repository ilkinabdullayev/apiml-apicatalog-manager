function configureEditor() {
    var editor = ace.edit("editor");
    // editor.setTheme("ace/theme/tomorrow_night_eighties");
    editor.session.setMode("ace/mode/yaml");
    // editor.session.setValue("text")
    // editor.setReadOnly(false)
    editor.execCommand("find")
    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        maxLines: 200,
        minLines: 100,
        showPrintMargin: false
        // wrap: true,
    });

}

configureEditor();