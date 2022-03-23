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
  data.map((obj, index) => `<div>
  <div data-desc="${obj.description}" class="num${index}" class="mainCard">
  <img class="deleteBtn" id="${index}" src="closeBtn.png">
  <h2>${obj.title.split("").slice(0, 31).join("")}</h2>
  <img src="${obj.image}">
  <p class="price">${obj.price} €</p>
  </div>
  <button id="${index}" class="showDescriptionBtn">Show Description</button>
  </div>`);
  

  // Delete Cards

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.id;
      data.splice(index, 1);
      createCard(data);
    });

  });
  
  // Description on click

  const descriptionBtn = document.querySelectorAll(".showDescriptionBtn");
  descriptionBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log((btn));
      const card = q(`.num${btn.id}`);
      card.classList.add("animate");
      const oldContent = card.innerHTML;
      card.innerHTML = `<p>${card.getAttribute("data-desc")}</p>`;
      btn.textContent = "Turn Back";

      btn.addEventListener("click", () => {
        card.innerHTML = oldContent;
        btn.textContent = "Show Description";
      })
    })
  })


}



