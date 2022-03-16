/* -------------------------------------------------------------------------- */
/*                                 Esercizio 1                                */
/* -------------------------------------------------------------------------- */

const q = (selector) => document.querySelector(selector);
const quoteParagraph = q("#quote");
const quotes = [
  "Io sono tuo padre!",
  "guerra nessuno fatto grande",
  "fare o non fare... non c'è provare",
  "L'imperatore non condivide affatto le vostre ottimistiche previsioni!",
  "Sto più in alto di te!",
  ".... (cit. Darth Maul)",
  "Eri come un fratello per me! (pianto)",
];

q("#quoteBtn").addEventListener("click", () => {
  const random = Math.floor(Math.random() * quotes.length);
  quoteParagraph.innerHTML = quotes[random];
  console.log(quoteParagraph, "index = " + random);
});

/* -------------------------------------------------------------------------- */
/*                                 Esercizio 2                                */
/* -------------------------------------------------------------------------- */

const message = q("#message");
const img = q("#img");
const username = q("#username");
const email = q("#email");
const submit = q("#submit");
const commentsList = q("#comments");

const comments = [];

const renderComments = () => {
  commentsList.innerHTML = comments
    .map((comment) => {
      if (comment.img === "") {
        comment.img = "https://randomuser.me/api/portraits/lego/1.jpg";
      }
      if (comment.username === "") {
        comment.username = "Utente Anonimo";
      }
      if (comment.email === "") {
        comment.email = "Nessuna email inserita";
      }
      if (comment.message === "") {
        comment.message = "L'utente non ha inserito alcun messaggio.";
      }
      return `<div class="comment">
        <img src="${comment.img}" alt="Foto Profilo">
        <div class="userData">
          <h4>Utente: ${comment.username}</h4>
          <small>${comment.email}</small>
        </div>
        <p class="message">${comment.message}</p>
      </div>`;
    })
    .join("");
  if (comments.length === 0) {
    commentsList.innerHTML = "Qua verranno mostrati i tuoi commenti";
  }
};

submit.addEventListener("click", () => {
  comments.push({
    message: message.value,
    username: username.value,
    email: email.value,
    img: img.value,
  });
  message.value = "";
  username.value = "";
  email.value = "";
  img.value = "";
  renderComments();
});

renderComments();
