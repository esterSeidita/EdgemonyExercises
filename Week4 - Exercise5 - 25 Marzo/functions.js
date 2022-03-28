export {
    getMoviesAPI,
    createCard,
    modalGenerator,
    modalUpdateGenerator,
    createNewCard,
    q,
    c
};

const q = (selector) => document.querySelector(selector);
const c = (selector) => document.createElement(selector);

const wrapper = q(".cardsWrapper");
const overlay = q("#overlay");
const submitInput = q("#submit");

const descriptionInput = q("#description");
const titleInput = q("#title");
const yearInput = q("#year");
const posterInput = q("#poster");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

/* -------------------------------------------------------------------------- */
/*                 Max length function for reduce text length                 */
/* -------------------------------------------------------------------------- */

function maxLength(maxChar, text) {
    return text.split("").slice(0, maxChar).join("");
}

/* -------------------------------------------------------------------------- */
/*                               Fetch Function                               */
/* -------------------------------------------------------------------------- */

const getMoviesAPI = async (URL) => {
    const res = await fetch(URL);
    return res.json();
}
/* -------------------------------------------------------------------------- */
/*                                Card Creation                               */
/* -------------------------------------------------------------------------- */

const createCard = (title, poster, index) => {
    const divEl = c('div');
    const h3El = c('h3');
    const imgEl = c('img');

    imgEl.setAttribute('src', poster);

    divEl.id = index;

    divEl.classList.add("card");
    divEl.classList.add("cardMovie");

    imgEl.classList.add("cardImg");

    h3El.textContent = title;

    divEl.append(imgEl, h3El);
    wrapper.appendChild(divEl);
} // Card creator end..

/* -------------------------------------------------------------------------- */
/*                         Modal Generator and Remover                        */
/* -------------------------------------------------------------------------- */

function modalGenerator(poster, title, description, year, genres) {
    overlay.classList.add("visible");
    const modal = c("div");
    modal.classList.add("modal");

    if (Array.isArray(genres)) {
        genres = genres.join(", ");
    };

    modal.innerHTML =
        `
          <img class="modalImage" src="${poster}">
          <div class="mainModal">
            <h2>${title}</h2>
            <p><strong>Descrizione: </strong>${maxLength(180, description)}</p>
            <p><strong>Anno: </strong>${year}</p>
            <p><strong>Generi: </strong>${genres}</p>
            <div class="actions">
              <strong>Actions: </strong>
              <button class="deleteCardBtn">Delete</button>
              <button class="updateCardBtn">Update</button>
            </div>
          </div>
        `;

    document.body.prepend(modal);

    // CLOSE MODAL

    overlay.addEventListener("click", () => {
        modal.classList.remove("modal");
        modal.innerHTML = "";
        overlay.classList.remove("visible");
    }) //close modal end..

}; //modalGenerator end..

/* -------------------------------------------------------------------------- */
/*                           Modal Update Generator                           */
/* -------------------------------------------------------------------------- */

function modalUpdateGenerator(poster, title, description, year, genres, id) {
    console.log("🚀 ~ file: functions.js ~ line 104 ~ modalUpdateGenerator ~ genres", genres)

    const modal = q(".modal");

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
        <input type="text" name="titleUpdate" id="titleUpdate" value="${title}">
      </div>

      <div class="flex-item">
        <label for="descriptionUpdate">Descrizione</label>
        <input type="text" name="descriptionUpdate" id="descriptionUpdate" value="${description}">  
      </div>
    </div>

    <div class="inputGroup">
      <div class="flex-item">
        <label for="yearUpdate">Anno</label>
        <input type="text" name="yearUpdate" id="yearUpdate" value="${year}">
      </div>
      
      <div class="flex-item">
        <label for="posterUpdate">Poster</label>
        <input type="text" name="posterUpdate" id="posterUpdate" value="${poster}">
      </div>
    </div>        
    
    <div class="checkboxGroup">  
      <fieldset>
        <legend>Di che genere di film si tratta?</legend>

        <div class="checkItem">
        <input type="checkbox" id="action" name="action" value="action">            
        <label for="action">Azione</label>
        </div>

        <div class="checkItem">
        <input type="checkbox" id="comedy" name="comedy" value="comedy">                 
        <label for="comedy">Commedia</label>
        </div>

        <div class="checkItem">
        <input type="checkbox" id="fantasy" name="fantasy" value="fantasy">                  
        <label for="fantasy">Fantasy</label>
        </div>

        <div class="checkItem">
        <input type="checkbox" id="cinecomic" name="cinecomic" value="cinecomic">
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
    const checkboxesUpd = document.querySelectorAll(".updateFormModal input[type='checkbox']");
    let checkArrayUpdated = [];

    checkboxesUpd.forEach(checkbox => {
        genres.forEach(genre => {
            if (checkbox.value.toLowerCase() === genre.toLowerCase()) {
                checkbox.checked = true;
            }
        })
    })



    console.log(checkArrayUpdated);
    const submitUpdate = q('#submitUpdate');
    submitUpdate.addEventListener("click", () => {

        checkboxesUpd.forEach(checkbox => {
            if (checkbox.checked) {
                checkArrayUpdated.push(checkbox.value);
            }
        })
        try {
            fetch(`https://edgemony-backend.herokuapp.com/movies/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        title: titleInputUpd.value,
                        poster: posterInputUpd.value,
                        year: yearInputUpd.value,
                        genres: checkArrayUpdated,
                        description: descriptionInputUpd.value,
                    }) //fetch body end
                }) //fetch end
                .then(() => {
                    location.reload()
                }) // reload end
        } catch (error) {
            alert("Errore: " + error);
        }

    }) // submit update click end

    // CLOSE MODAL //

    overlay.addEventListener("click", () => {
        updateFormModal.classList.remove("modal");
        updateFormModal.classList.remove("updateFormModal");
        updateFormModal.innerHTML = "";
        overlay.classList.remove("visible");
    }) // close modal end
} // function end...


/* -------------------------------------------------------------------------- */
/*                                Add new Card                                */
/* -------------------------------------------------------------------------- */

function createNewCard() {
    const newMovieForm = q("form");
    const addCardBtn = q(".addElCard");

    addCardBtn.addEventListener("click", () => {
        newMovieForm.classList.add("visible");
        overlay.classList.add("visible");
    })

    overlay.addEventListener("click", () => {
        newMovieForm.classList.remove("visible");
        overlay.classList.remove("visible");

    })

    submitInput.addEventListener("click", (event) => {
        event.preventDefault();
        newMovieForm.classList.remove("visible");
        let genresArray = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                genresArray.push(checkbox.value);
            }
        })
        try {
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
        } catch (error) {
            console.log("Errore: " + error);
        }
    }); //submit click end..
}