const q = (selector) => document.querySelector(selector);

const wrapper = q(".wrapper");


const getAPI = async (URL) => {
  const res = await fetch(URL);
  return await res.json();
}
loader.style.display = 'block';
getAPI("https://fakestoreapi.com/products").then((data) => {
  createCard(data);
  loader.style.display = 'none';
})



/* -------------------------------------------------------------------------- */
/*                            Create Card Function                            */
/* -------------------------------------------------------------------------- */


const createCard = (data) => {

  // Element creation
  wrapper.innerHTML =
    data.map((obj, index) =>
      `<div class="singleCard">
  <img class="deleteBtn" id="${index}" src="closeBtn.png">
      <div class="num${index} frontCard">
        <img class="productImage" src="${obj.image}">
        <h2>${obj.title.split("").slice(0, 31).join("")}</h2>
        <p class="price">${obj.price} €</p>
        <small>Click and Flip!</small>
      </div>
      <div class="num${index} backCard">
        <p class="description">${obj.description}</p>
      </div>
  </div>`).join("");


  // Delete Cards

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.id;
      data.splice(index, 1);
      createCard(data);
    });

  });

  // Description on click -- with button

  // const descriptionBtn = document.querySelectorAll(".showDescriptionBtn");
  // descriptionBtn.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     // console.log((btn));
  //     const card = q(`.num${btn.id}`);
  //     card.classList.add("animate");
  //     const oldContent = card.innerHTML;
  //     card.innerHTML = `<p>${card.getAttribute("data-desc")}</p>`;
  //     btn.textContent = "Turn Back";

  //     btn.addEventListener("click", () => {
  //       card.innerHTML = oldContent;
  //       btn.textContent = "Show Description";
  //     })
  //   })
  // })

  // Description on click

  const cards = document.querySelectorAll(".singleCard");

  function flipCard() {
    this.classList.toggle("flip");
  }

  cards.forEach((card) => {
    card.addEventListener("click", flipCard)
  })
}