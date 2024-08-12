// accordion

function drop() {
    let dropdowns = document.getElementsByClassName("syllabus__accordion--question");
    let i;
  
    for (i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener("click", function () {
        let isActive = this.classList.contains("open");
  
        closeAllDropdowns();
  
        if (!isActive) {
          this.classList.toggle("open");
          let dropdownContent = this.nextElementSibling;
          dropdownContent.style.display = "block";
  
          let height = dropdownContent.scrollHeight + "px";
          dropdownContent.style.maxHeight = height;
        }
      });
    }
  
    function closeAllDropdowns() {
      for (i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("open");
        let dropdownContent = dropdowns[i].nextElementSibling;
        dropdownContent.style.display = "none";
        dropdownContent.style.maxHeight = null;
      }
    }
  }
  
  drop();
  