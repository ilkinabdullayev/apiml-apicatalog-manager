function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

const ul = document.getElementById('actionTabs');
ul.onclick = function(event) {
    let targetNav = getEventTarget(event);
    let targetNavId = targetNav.getAttribute("href");
    targetNavId = targetNavId.substring(1);

    let existedClassesA = targetNav.getAttribute("class");
    if(existedClassesA.includes('active')) {
        event.preventDefault();
        return;
    }

    deactivateAllTabHeaders();
    targetNav.setAttribute("class", existedClassesA + ' active');
    
    hideAllTabSections();
    activeSelectedSection(targetNavId);
    event.preventDefault();
};


function deactivateAllTabHeaders() {
    const actionTabsHeader = document.getElementById('actionTabs');
    const aNavs = actionTabsHeader.querySelectorAll('a')
    aNavs.forEach((item, index) => {
        item.setAttribute("class", 'nav-link');
    });
}

function hideAllTabSections() {
    const actionTabsContent = document.getElementById('actionTabsContent');
    const tabDivs = actionTabsContent.querySelectorAll('.tab-pane')
    tabDivs.forEach((item, index) => {
        item.setAttribute("class", 'tab-pane');
    });
}

function activeSelectedSection(targetSecId) {
    let targetedDiv = document.getElementById(targetSecId);
    let existedClasses = targetedDiv.getAttribute("class");
    targetedDiv.setAttribute("class", existedClasses + ' show active');
}

function dropDown() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

dropDown();