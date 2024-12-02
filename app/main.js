import "./style.css";
const URL = "https://fortnite-api.com/v2/cosmetics/br";
const DOMSelectors = {
  cardContainer: document.querySelector(".card-container"),
  buttonContainer: document.querySelector(".form"),
};
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const cosmetics = await response.json();
    const skins = Object.values(cosmetics.data).filter(
      (cosmetic) => cosmetic.type.displayValue === "Outfit"
    );
    console.log(skins);
    createCard(skins);
    sortCardRarity(skins);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
function createCard(array) {
  let x = 0;
  while (x <= array.length) {
    if (
      !(array[x].description === "TBD") &&
      !(array[x].name === "Stormfarer") &&
      !(array[x].name === "Set_01_TA_SG") &&
      !(array[x].name === "Set_01_LA_SG") &&
      !(array[x].description === "NPC")
    ) {
      if (array[x].images.icon && array[x].introduction) {
        DOMSelectors.cardContainer.insertAdjacentHTML(
          "beforeEnd",
          `<div class="card w-[30%] bg-white mx-auto flex flex-wrap content-center justify-evenly"><div class="header-container"><h2 class="title text-center">${array[x].name}</h2></div><img src=${array[x].images.icon} alt="${array[x].name}'s Fortnite skin" class="card-image w-[90%]"><div class="info-container"><p class="skin-desc">${array[x].description}</p><p class="skin-rarity">Skin rarity: ${array[x].rarity.displayValue}</p><p class="skin-release">${array[x].introduction.text}</p></div></div>`
        );
      }
      if (array[x].name === "Loveless") {
        x = array.length;
      }
      x += 1;
    } else {
      x += 1;
    }
  }
}
async function sortCardRarity(array) {
  try {
    DOMSelectors.buttonContainer.addEventListener("click", function (event) {
      DOMSelectors.cardContainer.innerHTML = "";
      let search = event.target.value;
      console.log(search);
      if (search === "All") {
        createCard(array);
      } else {
        let newArray = Object.values(array).filter(
          (skin) => skin.rarity.displayValue === search
        );
        console.log(newArray);
        createCard(newArray);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
