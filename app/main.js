import "./style.css";
const skinURL = "https://fortnite-api.com/v2/cosmetics/br";
const carURL = "https://fortnite-api.com/v2/cosmetics/cars";
const DOMSelectors = {
  cardContainer: document.querySelector(".card-container"),
  inputContainer: document.querySelector(".form"),
  rarityList: document.querySelector(".rarity-select"),
  cardAmount: document.querySelector(".card-amount"),
  submit: document.querySelector(".submit-button"),
  typeButtons: document.querySelector(".category-button"),
};
async function getData(URL, otherURL) {
  try {
    let human = false;
    let car = false;
    const response1 = await fetch(URL);
    const cosmeticsSkin = await response1.json();
    const response2 = await fetch(carURL);
    const cosmeticsCar = await response2.json();
    let skins = Object.values(cosmeticsSkin.data).filter(
      (cosmetic) => cosmetic.type.displayValue === "Outfit"
    );
    if (skins[0].name === "Solid Snake") {
      human = true;
    } else {
      car = true;
    }
    createCard(skins, 100, "skins");
    DOMSelectors.typeButtons.addEventListener("click", function (event) {
      let type = event.target.value;
      if (type === "Cars" && car === false) {
        skins = Object.values(cosmeticsCar.data).filter(
          (cosmetic) => cosmetic.type.displayValue === "Body"
        );
        DOMSelectors.cardContainer.innerHTML = "";
        createCard(skins, 25, "cars");
        sortCards(skins, "cars");
      } else {
        sortCards(skins, "skins");
      }
    });
    sortCards(skins, "skins");
  } catch (error) {
    console.log(error);
  }
}

function createCard(array, limit, type) {
  for (let i = 0; i < limit; i++) {
    console.log(array[i]);
    if (
      array[i].description === "TBD" ||
      array[i].name === "Stormfarer" ||
      array[i].name === "Set_01_TA_SG" ||
      array[i].name === "Set_01_LA_SG" ||
      array[i].description === "NPC"
    ) {
      i += 1;
      limit += 1;
    } else {
      if (type === "skins") {
        if (array[i].images.icon && array[i].introduction) {
          DOMSelectors.cardContainer.insertAdjacentHTML(
            "beforeEnd",
            `<div class="card w-[30%] bg-white mx-auto flex flex-wrap content-center justify-evenly"><div class="header-container"><h2 class="title text-center text-[1rem] md:text-[1.1rem] lg:text-[1.4rem] xl:text-[1.8rem]">${array[i].name}</h2></div><img src=${array[i].images.icon} alt="${array[i].name}'s Fortnite skin" class="card-image w-[90%]"><div class="info-container text-[0.52rem] md:text-[0.65rem] lg:text-[0.8rem] xl:text-[1.2rem]"><p class="skin-desc">${array[i].description}</p><p class="skin-rarity">Skin rarity: ${array[i].rarity.displayValue}</p><p class="skin-release">${array[i].introduction.text}</p></div></div>`
          );
        }
        if (array[i].name === "Loveless") {
          i = limit;
        }
      }
      if (type === "cars") {
        if (array[i].images.large) {
          DOMSelectors.cardContainer.insertAdjacentHTML(
            "beforeEnd",
            `<div class="card w-[30%] bg-white mx-auto flex flex-wrap content-center justify-evenly"><div class="header-container"><h2 class="title text-center text-[1rem] md:text-[1.1rem] lg:text-[1.4rem] xl:text-[1.8rem]">${array[i].name}</h2></div><img src=${array[i].images.large} alt="${array[i].name}'s Fortnite skin" class="card-image w-[90%]"><div class="info-container text-[0.52rem] md:text-[0.65rem] lg:text-[0.8rem] xl:text-[1.2rem]"><p class="skin-desc">${array[i].description}</p><p class="skin-rarity">Skin rarity: ${array[i].rarity.displayValue}</p></div></div>`
          );
        }
      }
    }
  }
}
function sortCards(array, type) {
  if (type === "cars") {
    var selectObject = DOMSelectors.rarityList;
    for (var i = 0; i < selectObject.length; i++) {
      if (selectObject.options[i].value === "Legendary") selectObject.remove(i);
    }
  }
  DOMSelectors.submit.addEventListener("click", function (event) {
    event.preventDefault();
    DOMSelectors.inputContainer.reset();
  });
  DOMSelectors.rarityList.addEventListener("click", function (event) {
    let search = event.target.value;
    let newArray;
    if (search === "All") {
      newArray = array;
    } else {
      newArray = array.filter((skin) => skin.rarity.displayValue === search);
    }
    let amount = DOMSelectors.cardAmount.value;
    DOMSelectors.cardContainer.innerHTML = "";
    createCard(newArray, amount, type);
  });
}
getData(skinURL, carURL);
