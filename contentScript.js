const body = document.body;
//alert(x.outerHTML);

setTimeout(function(){ 
    addConsole();
}, 3000);


function addConsole() {
    let iFrame  = document.createElement ("iframe");
    iFrame.style.width = "100%";
    iFrame.style.height = "540px";
  //  iFrame.style.background = "black";
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
