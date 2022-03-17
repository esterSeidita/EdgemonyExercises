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

listContainer.innerHTML = movies.map((movie) => `<li>${movie}</li>`).join("");

q("#searchBtn").addEventListener("click", () => {
  const filteredList = movies.filter((movie) =>
    movie.toLowerCase().includes(userString.value.toLowerCase())
  );

  for (elem of filteredList) {
    listContainer.innerHTML = `<li> ${elem} </li>`;
  }
  if (filteredList.length === 0)
    listContainer.innerHTML = "Non ho trovato alcun risultato :(";
});
