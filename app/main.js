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
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
function createCard(array) {
  let x = 0;
  while (x < 20) {
    array.forEach(
      (album) =>
        DOMSelectors.cardContainer.insertAdjacentHTML(
          "beforeEnd",
          `<div class="card"><div class="header-container"><h2>${album.name}</h2></div><img src=${album.cover} alt="${album.name} cover" class="card-image"><div class="info-container"><p class="card-artist">${album.artist}</p><p class="card-genre">Genre: ${album.genre}</p><p class="card-date"> Date Released: ${album.releaseDate}</p><p class="card-length"> Album Length: ${album.albumLength} minutes</p><p class="card-amount">Number of Songs: ${album.albumAmount}</p></div></div>`
        ),
      (x += 1)
    );
  }
}
