const q = (selector) => document.querySelector(selector);
const newContactBtn = q("#newContactBtn");
const nameInput = q("#name");
const surnameInput = q("#surname");
const numberInput = q("#number");
const container = q("#addressBook");

const filter = q("#filter");

let addresses = [];

/* -------------------------------------------------------------------------- */
/*                               Add New Contact                              */
/* -------------------------------------------------------------------------- */

newContactBtn.addEventListener("click", () => {
  addresses.push({
    name: nameInput.value,
    surname: surnameInput.value,
    number: numberInput.value,
  });
  localStorage.setItem("addresses", JSON.stringify(addresses));
  addressListGenerator();
});

/* -------------------------------------------------------------------------- */
/*                              Filter of Contact                             */
/* -------------------------------------------------------------------------- */

filter.addEventListener("keyup", () => {
  addressListGenerator(filter.value);
});

/* -------------------------------------------------------------------------- */
/*                           Address List Generator                           */
/* -------------------------------------------------------------------------- */

const addressListGenerator = (value = "") => {

  const localAddresses = JSON.parse(localStorage.getItem("addresses"));

  const filteredList = localAddresses.filter((addressObj) =>
    addressObj.name.toLowerCase().includes(value.toLowerCase())
  );
  container.innerHTML = filteredList
    .map((address, index) => {
      return `
        <div>
            <img src="closeBtn.png" class="deleteBtn" data-index="${index}">
            <h2>${address.name + " " + address.surname}</h2>
            <p>${address.number}</p>
        </div>
        `;
    })
    .join("");

  // Delete a contact

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  try {
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        addresses.splice(index, 1);
        localStorage.setItem("addresses", JSON.stringify(addresses));
        addressListGenerator();
      });
    });
  } catch (error) {
    const p = document.createElement("p");
    newContactBtn.insertAdjacentHTML(
      "afterend",
      "<p class = 'error'>Attenzione, errore nell'aggiunta del contatto!</p>"
    );
  }
};

// End of function


addressListGenerator();