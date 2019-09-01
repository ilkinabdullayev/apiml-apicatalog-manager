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