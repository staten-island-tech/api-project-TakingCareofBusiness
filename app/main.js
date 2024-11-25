import "./style.css";
const URL = "https://fortnite-api.com/v2/cosmetics/br";
const DOMSelectors = {
  cardContainer: document.querySelector(".card-container"),
};
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const cosmetics = await response.json();
    const skins = Object.values(cosmetics.data).filter(
      (cosmetic) => cosmetic.type.displayValue === "Outfit"
    );
    console.log(skins);
    createCard(skins, 0);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
function createCard(array, limit) {
  if (limit === 0) {
    limit = 3000;
  }
  let x = 0;
  while (x < limit) {
    if (
      !(array[x].description === "TBD") &&
      !(array[x].name === "Stormfarer") &&
      !(array[x].name === "Set_01_TA_SG") &&
      !(array[x].name === "Set_01_LA_SG")
    ) {
      if (array[x].images.icon && array[x].introduction) {
        DOMSelectors.cardContainer.insertAdjacentHTML(
          "beforeEnd",
          `<div class="card w-[30%] bg-white mx-auto flex flex-wrap justify-evenly"><div class="header-container"><h2>${array[x].name}</h2></div><img src=${array[x].images.icon} alt="${array[x].name}'s Fortnite skin" class="card-image w-[90%]"><div class="info-container"><p class="skin-desc">${array[x].description}</p><p class="skin-rarity">Skin rarity: ${array[x].rarity.displayValue}</p><p class="skin-release">${array[x].introduction.text}</p></div></div>`
        );
      }
      x += 1;
      console.log(array[x]);
    } else {
      x += 1;
    }
  }
}
