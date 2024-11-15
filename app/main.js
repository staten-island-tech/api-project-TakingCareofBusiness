import "./style.css";
const URL = "https://libretranslate.com/translate";
async function getData(URL) {
  const response = await fetch(URL);
  console.log(response);
}
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: "Hello!",
    source: "en",
    target: "es",
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
