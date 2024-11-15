import "./style.css";
const URL = "https://api.api-onepiece.com/v2/characters/en/search/";
async function getData(URL) {
  const response = await fetch(URL);
  console.log(response);
}
getData(URL);
