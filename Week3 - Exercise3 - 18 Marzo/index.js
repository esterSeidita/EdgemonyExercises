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

const localCharacters = JSON.parse(localStorage.getItem("char"));
localStorage.setItem("char", JSON.stringify(people));

/* -------------------------------------------------------------------------- */
/*                                Add New Card                                */
/* -------------------------------------------------------------------------- */

q("#add").addEventListener("click", () => {
  localCharacters.push([inputName.value, inputUniverse.value].join(" - "));
  localStorage.setItem("char", JSON.stringify(localCharacters));
  cardsGenerator();
  inputName.value = "";
  inputUniverse.value = "";
});

/* -------------------------------------------------------------------------- */
/*                                   Filter                                   */
/* -------------------------------------------------------------------------- */

filter.addEventListener("keyup", () => {
  let val = q("#search").value;
  localStorage.setItem("char", JSON.stringify(localCharacters));
  cardsGenerator(val);
});

/* -------------------------------------------------------------------------- */
/*                               Cards Generator                              */
/* -------------------------------------------------------------------------- */

function cardsGenerator(val = "") {
  let finalArray = [];
  const filteredCards = localCharacters.filter((card) =>
    card.toLowerCase().includes(val.toLowerCase())
  );
  console.log(
    "🚀 ~ file: index.js ~ line 54 ~ cardsGenerator ~ filteredCards",
    filteredCards
  );

  filteredCards.forEach((elem) => {
    let elemArray = elem.split(" - ");
    finalArray.push(elemArray);
  });

  cards.innerHTML = finalArray
    .map(
      (card, index) =>
        `<div><img class="deleteBtn" data-index="${index}" src="closeBtn.png"><h3>${card[0]}</h3><p>${card[1]}</p></div>`
    )
    .join("");

  if (finalArray.length === 0) {
    cards.innerHTML = "Nessun risultato trovato";
  }

  // Delete Cards

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      localCharacters.splice(index, 1);
      localStorage.setItem("char", JSON.stringify(localCharacters));
      cardsGenerator();
    });
  });
}

// End of function

cardsGenerator();
