const q = (selector) => document.querySelector(selector);
const c = (selector) => document.createElement(selector);
const wrapper = q(".cardsWrapper");

const titleInput = q("#title");
const descriptionInput = q("#description");
const submitInput = q("#submit");
const posterInput = q("#poster");
const yearInput = q("#year");
const pageWrapper = q(".pageWrapper");

const getMoviesAPI = async (URL) => {
  const res = await fetch(URL);
  return res.json();
}

const createCard = (title, description, poster, id) => {
  const divEl = c('div');
  const h3El = c('h3');
  const imgEl = c('img');
  const closeBtn = c('img');
  const updateBtn = c('img');

  imgEl.setAttribute('src', poster);
  closeBtn.setAttribute('src', "closeBtn.png");
  updateBtn.setAttribute('src', "update.png");

  divEl.classList.add("card");
  closeBtn.classList.add("closeCardBtn");
  updateBtn.classList.add("updateCardBtn");
  imgEl.classList.add("cardImg");

  h3El.textContent = title;

  divEl.append(closeBtn, updateBtn, imgEl, h3El);
  wrapper.appendChild(divEl);

  closeBtn.addEventListener("click", () => {
    fetch(`https://edgemony-backend.herokuapp.com/movies/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      }
    }).then((data) => {
      location.reload()
    })
  })

  updateBtn.addEventListener("click", () => {
    const lastContent = pageWrapper.innerHTML;
    const modal = q("#hidden");
    modal.classList.add("hidden");
    const formEl = q('form').innerHTML;

    modal.innerHTML = `<img class="closeBtn" src="closeBtn.png"> ${formEl}`;
    closeModal = q(".closeBtn");
    pageWrapper.innerHTML = "";
    pageWrapper.classList.add('darker');

    // fetch(`https://edgemony-backend.herokuapp.com/movies/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     'Content-Type': "application/json"
    //   },
    //   // body: json.stringify({

    //   // }),
    // }).then((data) => {
    //   location.reload()
    // })

    closeModal.addEventListener("click", () => {
      pageWrapper.innerHTML = lastContent;
      console.log(lastContent);
      modal.classList.remove("hidden");
      modal.innerHTML = "";
      pageWrapper.classList.remove("darker");
      location.reload();
    })
  })




  divEl.addEventListener("click", () => {
    const lastContent = pageWrapper.innerHTML;
    const modal = q("#hidden");
    modal.classList.add("hidden");

    modal.innerHTML = `<h3>Descrizione:</h3><img class="closeBtn" src="closeBtn.png"><p>${description}</p>`;
    closeModal = q(".closeBtn");
    pageWrapper.innerHTML = "";
    pageWrapper.classList.add('darker');

    closeModal.addEventListener("click", () => {
      pageWrapper.innerHTML = lastContent;
      console.log(lastContent);
      modal.classList.remove("hidden");
      modal.innerHTML = "";
      pageWrapper.classList.remove("darker");
      location.reload();
    })

  })

}


getMoviesAPI("https://edgemony-backend.herokuapp.com/movies")
  .then((data) => {
    data.map((obj) =>
      createCard(obj.title, obj.description, obj.poster, obj.id)
    )
  })


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