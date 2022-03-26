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
const checkboxes = document.querySelectorAll("input[type='checkbox']");




getMoviesAPI("https://edgemony-backend.herokuapp.com/movies")
  .then((data) => {
    data.map((obj) =>
      createCard(obj.title, obj.description, obj.poster, obj.year, obj.genres, obj.id)
    )
  })
  .then(() => {

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
            <h2>${card.getAttribute("data-title")}</h2>
            <p><strong>Descrizione: </strong>${card.getAttribute("data-desc")}</p>
            <p><strong>Anno: </strong>${card.getAttribute("data-year")}</p>
            <p><strong>Generi: </strong>${card.getAttribute("data-genres")}</p>
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
          modal.classList.remove("modal");
          modal.classList.remove("updateFormModal");
          modal.innerHTML = "";

          const updateFormModal = document.createElement('div');
          updateFormModal.classList.add("updateFormModal");
          updateFormModal.classList.add("modal");

          updateFormModal.innerHTML = `
          <h2>Cosa vuoi modificare?</h2>    
          <div class="inputGroup">
            <div class="flex-item">
              <label for="titleUpdate">Titolo</label>
              <input type="text" name="titleUpdate" id="titleUpdate" value="${card.getAttribute("data-title")}">
            </div>
    
            <div class="flex-item">
              <label for="descriptionUpdate">Descrizione</label>
              <input type="text" name="descriptionUpdate" id="descriptionUpdate" value="${card.getAttribute("data-desc")}">  
            </div>
          </div>
  
          <div class="inputGroup">
            <div class="flex-item">
              <label for="yearUpdate">Anno</label>
              <input type="text" name="yearUpdate" id="yearUpdate" value="${card.getAttribute("data-year")}">
            </div>
            
            <div class="flex-item">
              <label for="posterUpdate">Poster</label>
              <input type="text" name="posterUpdate" id="posterUpdate" value="${card.getAttribute("data-img")}">
            </div>
          </div>        
          
          <div class="checkboxGroup">  
            <fieldset>
              <legend>Di che genere di film si tratta?</legend>
  
              <div class="checkItem">
              <input type="checkbox" id="action" name="action" value="Azione">            
              <label for="action">Azione</label>
              </div>
  
              <div class="checkItem">
              <input type="checkbox" id="comedy" name="comedy" value="Commedia">                 
              <label for="comedy">Commedia</label>
              </div>
  
              <div class="checkItem">
              <input type="checkbox" id="fantasy" name="fantasy" value="Fantasy">                  
              <label for="fantasy">Fantasy</label>
              </div>
  
              <div class="checkItem">
              <input type="checkbox" id="cinecomic" name="cinecomic" value="Cinecomic">
              <label for="cinecomic">Cinecomic</label>
              </div>
            </fieldset>
          </div>
          <input type="submit" id="submitUpdate" value="Modifica">  
          `

          document.body.prepend(updateFormModal);

          const descriptionInputUpd = q("#descriptionUpdate");
          const titleInputUpd = q("#titleUpdate");
          const yearInputUpd = q("#yearUpdate");
          const posterInputUpd = q("#posterUpdate");
          const checkboxesUpd = document.querySelectorAll("input[type='checkbox']");
          const checkArrayUpdated = [];
          console.log("🚀 ~ file: script.js ~ line 157 ~ updateCardBtn.addEventListener ~ checkArrayUpdated", checkArrayUpdated)

          checkboxesUpd.forEach(checkbox => {
            if (checkbox.checked) {
              console.log(checkbox);
              checkArrayUpdated.push(checkbox.value);
            }
          })


          const submitUpdate = q('#submitUpdate');
          submitUpdate.addEventListener("click", () => {

            fetch(`https://edgemony-backend.herokuapp.com/movies/${card.id}`, {
                method: "PATCH",
                headers: {
                  'Content-Type': "application/json"
                },
                body: JSON.stringify({
                  id: card.id,
                  title: titleInputUpd.value,
                  poster: posterInputUpd.value,
                  year: yearInputUpd.value,
                  description: descriptionInputUpd.value
                }) //fetch body end
              }) //fetch end
              .then(() => {
                location.reload()
              }) // reload end

          }) // submit update click end

          /* -------------------------------------------------------------------------- */
          /*                                 Close Modal                                */
          /* -------------------------------------------------------------------------- */
          overlay.addEventListener("click", () => {
            updateFormModal.classList.remove("modal");
            updateFormModal.classList.remove("updateFormModal");
            updateFormModal.innerHTML = "";
            overlay.classList.remove("visible");
          }) // close modal end
        }) //update end
      }) // card click end
    }) // foreach card end
  }) // then end


/* -------------------------------------------------------------------------- */
/*                                Add new Card                                */
/* -------------------------------------------------------------------------- */

submitInput.addEventListener("click", (event) => {
  event.preventDefault();
  let genresArray = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      genresArray.push(checkbox.value);
    }
  })
  console.log(genresArray);
  fetch("https://edgemony-backend.herokuapp.com/movies/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: descriptionInput.value,
      genres: genresArray,
      poster: posterInput.value,
      title: titleInput.value,
      year: yearInput.value
    })
  }).then(() => location.reload())
})