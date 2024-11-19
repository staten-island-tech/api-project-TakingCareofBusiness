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
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
function createCard(array) {
  let x = 0;
  while (x < 20) {
    array.forEach(
      (skin) =>
        DOMSelectors.cardContainer.insertAdjacentHTML(
          "beforeEnd",
          `<div class="card"><div class="header-container"><h2>${skin[x].name}</h2></div><img src=${skin[x].images.icon} alt="${skin[x].name}'s Fortnite skin" class="card-image"><div class="info-container"><p class="skin-desc">${skin[x].description}</p><p class="skin-rarity">Skin rarity: ${skin[x].rarity.displayValue}</p><p class="skin-set">${skin[x].set.text}</p><p class="skin-release">${skin[x].introduction.text}</p></div></div>`
        ),
      (x += 1)
    );
  }
}
