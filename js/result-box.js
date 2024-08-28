const search = document.getElementById("search");

let availableKeywords = [
  "გრაფიკული დიზაინის კურსი",
  "გახდი გრაფიკოს დიზაინერი SkillUp-თან ერთად!",
  "პროგრამირება, Front-end დეველოპმენტი",
  "ციფრული მარკეტინგი",
  "შესავალი გრაფიკულ დიზაინში",
  "გრაფიკული დიზაინის კურსი, Adobe Photoshop, Adobe Illustrator",
  "შეისწავლე გრაფიკული დიზაინი სრულყოფილად ნია ხვიტიასთან ერთად",
  "გრაფიკული დიზაინის შესასწავლი 3 თვიანი კურსი",
  "ქსელების ინჟინერია, Packet Tracer",
  "თამაშების დეველოპმენტი",
  "ეთიკური ჰაკინგი",
  "ციფრული პროდუქტების ტესტირება (QA)",
  "პერსონალური განვითარება",
  "მარკეტინგი",
];

const resultBox = document.querySelector(".result__box");
const inputBox = document.getElementById("input__box");

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
      result = availableKeywords.filter((keyword) => {
        return keyword.toLocaleLowerCase().includes(input.toLocaleLowerCase());
      });
      console.log(result);
    }
    display(result);
  
    if(!result.length) {
      resultBox.innerHTML = "";
  
    }
  };
  
  function display(result) {
    const content = result.map((list) => {
      return "<li onclick=selectInput(this)>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>" + content.join("") + "</ul>";
  }
  
  function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultBox.innerHTML = "";
  }