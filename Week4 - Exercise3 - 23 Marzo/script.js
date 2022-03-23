const q = (selector) => document.querySelector(selector);

const wrapper = q(".wrapper");


const getAPI = async(URL) => {
  const res = await fetch(URL);
  return await res.json();
}

getAPI("https://fakestoreapi.com/products").then((data) => {
  console.log(data);
  data.map((product) => {
    createCard(product.title, product.image, product.description, product.price);
  })
})

const getShortText = (text) => {

}
const createCard = (title, img, description, price) => {
  const divEl = document.createElement('div');
  const h2El = document.createElement('h2');
  const imgEl = document.createElement('img');
  const parDescEl = document.createElement('p');
  const parPriceEl = document.createElement('p');
  
  divEl.setAttribute('data-desc', description);
  imgEl.setAttribute('src', img);
  parPriceEl.classList.add('price');

  h2El.textContent = title.split("").slice(0, 51).join("");
  parDescEl.textContent = description;
  parPriceEl.textContent = price + " €";

  wrapper.appendChild(divEl);
  divEl.append(h2El, imgEl, parPriceEl);
  
  const cards = document.querySelectorAll(".wrapper>div");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("animated");
      card.innerHTML =`<p>${card.getAttribute("data-desc")}</p>`;
      // card.addEventListener("click", () => {
      //   card.textContent = "";
      //   card.append(h2El, imgEl, parPriceEl)
      // })
    })
  })
}
