const docUrl = "https://docs.google.com/document/d/e/2PACX-1vQY24NdsAlkXJuF07SylkH26g8ZkPkFrDR-vUPlasaL--MvqYBSrVujJZGpfV9H4fNTtcIggM0qj4it/pub";

const randomTrivia = document.getElementById("randomTrivia");
const moreTriviabtn = document.getElementById("moreTriviabtn");

let triviaList = [];

fetch(docUrl).then(response => response.text())
    .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const contentDiv = doc.querySelector(".doc-content");
    const text = contentDiv ? contentDiv.innerText : doc.body.innerText;
    triviaList = [...text.matchAll(/\(([^)]+)\)/g)].map(match => match[1].trim());

    randomTrivia.textContent = triviaList[Math.floor(Math.random() * triviaList.length)];
    showRandomTrivia();
    
    //remove comment to put a time interval
    //setInterval(showRandomTrivia, 180000); 
  })
  .catch(error => {
    console.error(error);
  });

let lastTrivia = "";
let lastImage = "";

const images = [
  "images/dolphines.jpg",
  "images/monkeys.jpg",
  "images/physics_image.jpg"
];

function showRandomTrivia() {

  randomTrivia.style.opacity = 0;
  setTimeout(() => {
    let rTrivia = triviaList[Math.floor(Math.random() * triviaList.length)];
    let rImage = images[Math.floor(Math.random() * images.length)];

    while (rTrivia === lastTrivia || rImage === lastImage) {
      rTrivia = triviaList[Math.floor(Math.random() * triviaList.length)];
      rImage = images[Math.floor(Math.random() * images.length)];
    }

    randomTrivia.textContent = rTrivia;
    document.getElementById("randomImg").src = rImage;
    randomTrivia.style.opacity = 1;
    
    lastTrivia = rTrivia;
    lastImage = rImage;

  }, 100);
}

moreTriviabtn.addEventListener('click', showRandomTrivia);
