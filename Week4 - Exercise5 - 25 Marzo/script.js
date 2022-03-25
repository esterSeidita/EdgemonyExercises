import {
  createCard,
  getMoviesAPI,
  q,
  c
} from './functions.js';

const submitInput = q("#submit");
const descriptionInput = q("#description");
const titleInput = q("#title");
const yearInput = q("#year");
const posterInput = q("#poster");


getMoviesAPI("https://edgemony-backend.herokuapp.com/movies")
  .then((data) => {
    data.map((obj) =>
      createCard(obj.title, obj.description, obj.poster, obj.year, obj.id)
    )
  })
  .then((json) => {
    console.log(json)

    /* -------------------------------------------------------------------------- */
    /*                                 Open Modal                                 */
    /* -------------------------------------------------------------------------- */
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener("click", () => {

        const overlay = q("#overlay");
        overlay.classList.add("visible");
        const modal = c("div");
        modal.classList.add("modal");

        modal.innerHTML =
          `
        <div class="modalWrap">
          <img class="modalImage" src="${card.getAttribute("data-img")}">
          <div>
            <p><strong>Descrizione: </strong>${card.getAttribute("data-desc")}</p>
            <p><strong>Anno: </strong>${card.getAttribute("data-year")}</p>
            <div class="actions">
              <strong>Actions: </strong>
              <button class="deleteCardBtn">Delete</button>
              <button class="updateCardBtn">Update</button>
            </div>
          </div>
        </div>
        `;

        document.body.prepend(modal);
        /* -------------------------------------------------------------------------- */
        /*                                 Close Modal                                */
        /* -------------------------------------------------------------------------- */
        overlay.addEventListener("click", () => {
          modal.classList.remove("modal");
          modal.innerHTML = "";
          overlay.classList.remove("visible");
        })
        /* -------------------------------------------------------------------------- */
        /*                             Delete Card Action                             */
        /* -------------------------------------------------------------------------- */
        const deleteCardBtn = q('.deleteCardBtn');

        deleteCardBtn.addEventListener("click", () => {
          fetch(`https://edgemony-backend.herokuapp.com/movies/${card.id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': "application/json"
            }
          }).then((data) => {
            location.reload()
          })
        })

        /* -------------------------------------------------------------------------- */
        /*                             Update Card Action                             */
        /* -------------------------------------------------------------------------- */
        const updateCardBtn = q('.updateCardBtn');

        updateCardBtn.addEventListener("click", () => {
          fetch(`https://edgemony-backend.herokuapp.com/movies/${card.id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
              id: card.id,
              title: card.getAttribute("data-title"),
              poster: "https://lumiere-a.akamaihd.net/v1/images/image_8c4aa72b.jpeg",
              year: 2016,
              genres: [
                "action",
                "comedy",
                "cinecomic"
              ],
              description: "Deadpool is a 2016 American superhero film based on the Marvel Comics character of the same name. Distributed by 20th Century Fox, it is the eighth film in the X-Men film series."
            })
          })
        }).then(() => {
          location.reload()
        }) //update end
      }) // card click end
    }) // foreach card end
  }) // then end


/* -------------------------------------------------------------------------- */
/*                                Add new Card                                */
/* -------------------------------------------------------------------------- */

submitInput.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://edgemony-backend.herokuapp.com/movies/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: descriptionInput.value,
      genres: ["animation"],
      poster: posterInput.value,
      title: titleInput.value,
      year: yearInput.value
    })
  }).then(() => location.reload())
})