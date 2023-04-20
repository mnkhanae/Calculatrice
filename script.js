//DOM
const touches = [...document.querySelectorAll(".bouton")];
const result = document.querySelector(".result");
const calcul = document.querySelector(".calcul");
const historique = document.querySelector(".historique");
const egal = document.querySelector("#equal");

let countCalcul = 0;

touches.forEach((touche) => {
  touche.addEventListener("click", (event) => {
    if (event.target.id == "AC") {
      result.innerText = "";
      calcul.innerText = "";
    } else if (
      event.target.id == "backspace" ||
      event.target.id == "backspace-icon"
    ) {
      calcul.innerText = calcul.innerText.slice(0, -1);
      if (calcul.innerText.length > 0) {
        result.innerText = eval(calcul.innerText);
      } else {
        result.innerText = "";
      }
    } else if (event.target.id == "equal") {
      result.innerText = eval(calcul.innerText);
      calcul.innerText = "";
      result.style.fontWeight = "bold";
      result.style.fontSize = "3rem";
      result.style.color = "#f482b0";

      addHistory();
    } else {
      calcul.innerText += event.target.getAttribute("key");
      result.innerText = eval(calcul.innerText);
    }
  });
});

const authorizedCharacters = ["*", "-", "/", "%", "+", "(", ")"];

window.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    result.innerText = eval(calcul.innerText);
    addHistory();
  } else if (event.key == "Backspace") {
    calcul.innerText = calcul.innerText.slice(0, -1);
    if (calcul.innerText.length > 0) {
      result.innerText = eval(calcul.innerText);
    } else {
      result.innerText = "";
    }
  } else if (
    (event.key >= 0 && event.key <= 9) ||
    authorizedCharacters.includes(event.key)
  ) {
    if (event.key == "%") {
      calcul.innerText += "/100";
    } else {
      calcul.innerText += event.key;
    }
    result.innerText = eval(calcul.innerText);
  }
});
const addHistory = () => {
  if (countCalcul >= 3) {
    document.querySelector(".calcul-historique").remove();
  }
  // document.querySelector(".historique div:nth-of-type(1)").remove();
  historique.innerHTML +=
    "<div class='calcul-historique'><p>" +
    calcul.innerText +
    "</p><p>" +
    result.innerText +
    "</p></div>";
  countCalcul++;
};

const clickIcon = document.querySelector(".clock-icon");
console.log(historique.style);
clickIcon.addEventListener("click", (event) => {
  if (historique.style.display == "" || historique.style.display === "none") {
    historique.style.display = "block";
  } else {
    historique.style.display = "none";
  }
});
