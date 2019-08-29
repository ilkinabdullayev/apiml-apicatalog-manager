const body = document.body;
//alert(x.outerHTML);

setTimeout(function(){ 
    const root = document.getElementById('root');
    const sg = root.getElementsByClassName('css-2rt1pw');
    //increase height of body
   // document.body.style.height = (document.body.scrollHeight + 300) + 'px';

    addConsole();

  //  alert(sg.outerHTML);
   // chrome.tabs.executeScript(null, {code:"document.body.bgColor='red'"});
}, 3000);


function addConsole() {
    let iFrame  = document.createElement ("iframe");
    iFrame.style.width = "100%";
    iFrame.style.height = "540px";
    iFrame.style.background = "black";
    iFrame.style.border = "none"
    iFrame.src  = chrome.extension.getURL ("banner/append_banner.html");

    body.appendChild(iFrame);
}

function addConsole2() {
    const console = document.createElement("div");
    console.style.width = "100%";
    console.style.height = "500px";
    console.style.background = "black";
    console.style.color = "white";
    console.innerHTML = '<h3 style="text-align:center">Hello from ZOS logs</h3>';

    body.appendChild(console);
}
