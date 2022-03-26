export {
    getMoviesAPI,
    createCard,
    q,
    c
};

const q = (selector) => document.querySelector(selector);
const c = (selector) => document.createElement(selector);

const wrapper = q(".cardsWrapper");

const getMoviesAPI = async (URL) => {
    const res = await fetch(URL);
    return res.json();
}

const createCard = (title, description, poster, year, genres, id) => {
    const divEl = c('div');
    const h3El = c('h3');
    const imgEl = c('img');

    imgEl.setAttribute('src', poster);

    divEl.classList.add("card");
    divEl.classList.add("cardMovie");
    divEl.setAttribute("data-title", title);
    divEl.setAttribute("data-desc", description);
    divEl.setAttribute("data-img", poster);
    divEl.setAttribute("data-year", year);
    if (Array.isArray(genres)) {
        divEl.setAttribute("data-genres", genres.join(", "));
    } else {
        divEl.setAttribute("data-genres", genres);
    }

    divEl.id = id;

    imgEl.classList.add("cardImg");

    h3El.textContent = title;

    divEl.append(imgEl, h3El);
    wrapper.appendChild(divEl);
}