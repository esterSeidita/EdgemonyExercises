const q = (selector) => document.querySelector(selector);
const people = [
  "Luke Skywalker - Star Wars",
  "Jack Burton - Grosso guaio a Chinatown",
  "Jhonny Silverhad - Cyberpunk 2077",
  "Bilbo Baggins - Il signore degli anelli",
  "Rick Sanchez - Rick & Morty",
  "Master Chief - Halo",
  "Eleven - Stranger Things",
];

const cards = q(".cards");
const filter = q("#search");
const inputName = q("#name");
const inputUniverse = q("#universe");

q("#add").addEventListener("click", () => {
  people.push([inputName.value, inputUniverse.value].join(" - "));
  cardsGenerator();
  inputName.value = "";
  inputUniverse.value = "";
});

filter.addEventListener("keyup", () => {
  let val = q("#search").value;
  console.log(val);
  cardsGenerator(val);
});

function cardsGenerator(val = "") {
  let finalArray = [];
  const filteredCards = people.filter((card) =>
    card.toLowerCase().includes(val.toLowerCase())
  );

  filteredCards.forEach((elem) => {
    let elemArray = elem.split(" - ");
    finalArray.push(elemArray);
  });

  console.log(finalArray);

  cards.innerHTML = finalArray
    .map((card) => `<div><h3>${card[0]}</h3><p>${card[1]}</p></div>`)
    .join("");

  if (finalArray.length === 0) {
    cards.innerHTML = "Nessun risultato trovato";
  }
}

cardsGenerator();
