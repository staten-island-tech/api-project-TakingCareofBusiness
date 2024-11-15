import "./style.css";
const URL = "https://bugsnaxapi.com/api/bugsnax";
async function getData(URL) {
  const response = await fetch(URL);
  console.log(response);
}
getData(URL);
