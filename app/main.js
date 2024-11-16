import "./style.css";
const URL = "https://fortnite-api.com/v2/cosmetics/br";
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const jsonDirect = await response.json();
    const info = JSON.parse(jsonDirect);
    console.log(info.data[0]);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
