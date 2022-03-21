const q = (selector) => document.querySelector(selector);
const newContactBtn = q("#newContactBtn");
const nameInput = q("#name");
const surnameInput = q("#surname");
const numberInput = q("#number");
const container = q("#addressBook");

const addresses = [
  { name: "Ester", surname: "Seidita", number: "372668268" },
  { name: "Ester", surname: "Seidita", number: "372668268" },
];

const addressListGenerator = (value = "") => {
  localStorage.setItem("addresses", JSON.stringify(addresses));
  container.innerHTML = JSON.parse(localStorage.getItem("addresses"))
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

  const deleteBtn = document.querySelectorAll(".deleteBtn");
  try {
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        addresses.splice(index, 1);
        console.log(index);
        addressListGenerator();
      });
    });
  } catch (error) {
    const p = document.createElement("p");
    newContactBtn.insertAdjacentHTML(
      "afterend",
      "<p class = 'error'>Attenzione, errore nell'aggiunta del contatto!</p>"
    );
    // p.textContent = "Attenzione, errore nell'aggiunta del contatto!";
  }
};

newContactBtn.addEventListener("click", () => {
  addresses.push({
    name: nameInput.value,
    surname: surnameInput.value,
    number: numberInput.value,
  });
  addressListGenerator();
});

addressListGenerator();
