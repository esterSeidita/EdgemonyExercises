const q = (selector) => document.querySelector(selector);
const c = (selector) => document.createElement(selector);
const wrapper = q(".cardsWrapper");

const titleInput = q("#title");
const descriptionInput = q("#description");
const submitInput = q("#submit");
const posterInput = q("#poster");
const yearInput = q("#year");
const pageWrapper = q(".pageWrapper");

const getMoviesAPI = async(URL) =>{
  const res = await fetch(URL);
  return res.json();
}

const createCard = (title, description, poster, id) => {
  const divEl = c('div');
  const h3El = c('h3');
  const imgEl = c('img');
  const pDescEl = c('p');
  const closeBtn = c('img');

  imgEl.setAttribute('src', poster);
  closeBtn.setAttribute('src', "closeBtn.png");

  divEl.classList.add("card");
  closeBtn.classList.add("closeCardBtn");
  imgEl.classList.add("cardImg");

  h3El.textContent = title;
  pDescEl.textContent = description;

  divEl.append(closeBtn, imgEl, h3El, pDescEl);
  wrapper.appendChild(divEl);

  closeBtn.addEventListener("click", () => {
    fetch(`https://edgemony-backend.herokuapp.com/movies/${id}`, {
      method: "DELETE",
      headers: {'Content-Type': "application/json" }
  }
    ).then((data) => {location.reload()})
  })

  divEl.addEventListener("click", () => {
    const lastContent = pageWrapper.innerHTML;
    const modal = q("#hidden");    
    modal.classList.add("hidden");

    modal.innerHTML = `<h3>Descrizione:</h3><img class="closeBtn" src="closeBtn.png"><p>${description}</p>`;
    closeModal= q(".closeBtn");
    pageWrapper.innerHTML="";
    pageWrapper.classList.add('darker');
    
    closeModal.addEventListener("click", () => {
      pageWrapper.innerHTML = lastContent;
      console.log(lastContent);
      modal.classList.remove("hidden");
      modal.innerHTML= "";
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
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
      description: descriptionInput.value.split("").slice(0,45).join("") + "...",
      genres: ["animation"],
      poster: posterInput.value,
      title: titleInput.value,
      year: yearInput.value
    })
  }).then(() => location.reload())
})