const q = (selector) => document.querySelector(selector);
const listContainer = q("#list");
const userString = q("#userString");
const movies = [
  "Deadpool",
  "Dune",
  "Grosso guaio a Chinatown",
  "V per vendetta",
  "Pulp Fiction",
  "Signore degli anelli",
  "Scarface",
  "Sharknado (1,2,3,4,5 e 6)",
  "Blade Runner",
];

function listGenerator(input = "") {
  const filteredList = movies.filter((movie) =>
    movie.toLowerCase().includes(userString.value.toLowerCase())
  );

  listContainer.innerHTML = filteredList
    .map((movie) => `<li>${movie}</li>`)
    .join("");

  if (filteredList.length === 0)
    listContainer.innerHTML = "Non ho trovato alcun risultato :(";
}

userString.addEventListener("keyup", () => {
  const input = userString.value;
  listGenerator(input);
});

listGenerator();
