function openTab(evt, tabName) {
  // Hide all tab panes
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-pane");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab links
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab and add "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Scroll to the active tab content
  const tabContents = document.querySelector(".tab-content");
  const activeTab = document.getElementById(tabName);
  tabContents.scrollLeft = activeTab.offsetLeft;
}

// Initialize by opening the first tab
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tablinks").click();
});
