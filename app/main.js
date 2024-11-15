import "./style.css";
const URL = "https://fortnite-api.com/v2/cosmetics/br";
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const info = await response.json();
    console.log(info.data[1]);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
