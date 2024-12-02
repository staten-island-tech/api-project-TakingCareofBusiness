import "./style.css";
const URL = "https://fortnite-api.com/v2/cosmetics/br";
const DOMSelectors = {
  cardContainer: document.querySelector(".card-container"),
  inputContainer: document.querySelector(".form"),
  rarityList: document.querySelector(".rarity-select"),
  cardAmount: document.querySelector(".card-amount"),
  submit: document.querySelector(".submit-button"),
};
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const cosmetics = await response.json();
    const skins = Object.values(cosmetics.data).filter(
      (cosmetic) => cosmetic.type.displayValue === "Outfit"
    );
    createCard(skins, 0);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
function createCard(array, x) {
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
          `<div class="card w-[30%] bg-white mx-auto flex flex-wrap content-center justify-evenly"><div class="header-container"><h2 class="title text-center text-[1rem] md:text-[1.1rem] lg:text-[1.4rem] xl:text-[1.8rem]">${array[x].name}</h2></div><img src=${array[x].images.icon} alt="${array[x].name}'s Fortnite skin" class="card-image w-[90%]"><div class="info-container text-[0.52rem] md:text-[0.65rem] lg:text-[0.8rem] xl:text-[1.2rem]"><p class="skin-desc">${array[x].description}</p><p class="skin-rarity">Skin rarity: ${array[x].rarity.displayValue}</p><p class="skin-release">${array[x].introduction.text}</p></div></div>`
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
function sortCardRarity(array) {
  DOMSelectors.rarityList.addEventListener("click", function (event) {
    let search = event.target.value;
    if (search === "All") {
      let newArray = array;
      return newArray;
    } else {
      let newArray = Object.values(array).filter(
        (skin) => skin.rarity.displayValue === search
      );
      return newArray;
    }
  });
}
async function cardAmount() {
  const response = await fetch(URL);
  const cosmetics = await response.json();
  const skins = Object.values(cosmetics.data).filter(
    (cosmetic) => cosmetic.type.displayValue === "Outfit"
  );
  DOMSelectors.rarityList.addEventListener("click", function (event) {
    let all = false;
    let other = false;
    let search = event.target.value;
    if (search === "All") {
      let array = skins;
    } else {
      let array = Object.values(skins).filter(
        (skin) => skin.rarity.displayValue === search
      );
    }
  });
  console.log(array);
  DOMSelectors.submit.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("hi");
    DOMSelectors.inputContainer.reset();
    DOMSelectors.cardContainer.innerHTML = "";
    let amount = DOMSelectors.cardAmount.value;
    createCard(array, amount);
  });
}
cardAmount();
