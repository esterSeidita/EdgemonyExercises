const q = (selector) => document.querySelector(selector);

const wrapper = q(".wrapper");


const getAPI = async(URL) => {
  const res = await fetch(URL);
  return await res.json();
}

getAPI("https://fakestoreapi.com/products").then((data) => {
  createCard(data);
})

/* -------------------------------------------------------------------------- */
/*                            Create Card Function                            */
/* -------------------------------------------------------------------------- */


const createCard = (data) => {

  // Element creation
  wrapper.innerHTML =
  data.map((obj, index) => `<div data-desc="${obj.description}">
  <img class="deleteBtn" id="${index}" src="closeBtn.png">
  <h2>${obj.title.split("").slice(0, 51).join("")}</h2>
  <img src="${obj.image}">
  <p class="price">${obj.price} €</p>
  </div>`);
  

  // Delete Cards

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("id");
      data.splice(index, 1);
      createCard(data);
    });

  });
  
  // Description on click
  
  const cards = document.querySelectorAll(".wrapper>div");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("swipe");
      const oldContent = card.innerHTML;
      card.innerHTML = `<p>${card.getAttribute("data-desc")}</p>`;
      card.addEventListener("click", () => {
        card.innerHTML = oldContent;
      })
    })
  })

}



