import {
  createCard,
  getMoviesAPI,
  modalGenerator,
  modalUpdateGenerator,
  createNewCard,
  q,
  c
} from './functions.js';

let dataArray = [];

loader.style.display = 'block';

getMoviesAPI("https://edgemony-backend.herokuapp.com/movies")
  .then((data) => {
    dataArray = data;

    data.map((obj, index) => {
      createCard(obj.title, obj.poster, index);
    })

    loader.style.display = 'none';

  })
  .then(() => {

    const cards = document.querySelectorAll('.cardMovie');

    cards.forEach(card => {

      const cardEl = dataArray[card.id];

      card.addEventListener("click", () => {

        // MODAL GENERATOR //

        modalGenerator(cardEl.poster, cardEl.title, cardEl.description, cardEl.year, cardEl.genres);

        // CARD DELETE //

        const deleteCardBtn = q('.deleteCardBtn');

        deleteCardBtn.addEventListener("click", () => {
          fetch(`https://edgemony-backend.herokuapp.com/movies/${cardEl.id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': "application/json"
            }
          }).then(() => {
            location.reload()
          })
        }) // delete button click event end

        // UPDATE CARD //

        const updateCardBtn = q('.updateCardBtn');

        updateCardBtn.addEventListener("click", () => {

          modalUpdateGenerator(cardEl.poster, cardEl.title, cardEl.description, cardEl.year, cardEl.genres, cardEl.id);

        }); // update end
      }) // click event on card end
    }) //foreach card end
  }) // end of then in fetch

createNewCard();