/*  
  ESERCIZI SULLO SCOPE
  ATTENZIONE: provare a prima dare prima la risposta e solo dopo testare il codice!!
  Giustificatene il motivo con un commento, subito accanto a 'RISPOSTA:'.
*/

// Es. 1: Dato il seguente 'snippet' (piccolo programmino), qual'è il risultato dei console.log?
// RISPOSTA: 3.14 ripetuto due volte, una per ogni console.log effettuato

const PI = 3.14;

console.log(PI);

if (PI >= 3) {
    console.log(PI);
}

// Es. 2: Dato il seguente, qual'è il risultato dei console.log?
// RISPOSTA: "Il mio colore preferito è: violet" per il primo (prende il valore di favColour dentro l'if)
// "Ci sono 12 mesi in un anno." nel secondo (prende monthsInAYear dalla variabile globale)

var favColour = "violet";
let monthsInAYear = 12;

if (true) {
    var favColour = "violet";
    console.log("Il mio colore preferito è:", favColour);
}

console.log("Ci sono", monthsInAYear, "mesi in un anno.");

// Es. 3: Dato il seguente, qual'è il risultato dei console.log?
// RISPOSTA: nel primo: "Sugo di pomodoro freschissimo, rucola, prosciutto crudo e scaglie di grana." perché prende la stringa
// dentro theSecond (var locale) e la stringa inserita ad argomento quando si chiama la funzione makePizza.
// Nel secondo ci sarà un errore perché theSecond non è una variabile definita a livello globale o locale dentro il blocco
// codice dell'if, dunque non darà nessun risultato.

function makePizza(moreIngredients) {
    let theSecond = "Sugo di pomodoro freschissimo";
    // { ... }
    console.log(theSecond + ", " + moreIngredients);
    return true; // non fa niente in pratica! Ritorna solo true (ne riparleremo a lezione!)
}

if (true) {
    makePizza("rucola, prosciutto crudo e scaglie di grana.");
    console.log("Il secondo ingrediente necessario: ", theSecond);
}