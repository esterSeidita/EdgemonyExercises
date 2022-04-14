import "./App.css";
import { BookCard } from "./components/BookCard";
import { Header } from "./components/Header";
import {data} from "./data"

function App() {
  return (
    <div className="App">
        <Header/>
        <div className="cardsWrapper">
          {data.products.map(book => 
            <BookCard img={book.img} title={book.name} description={book.description.split("").slice(0,80).join("") + ".."}/>
          )}
        </div>
    </div>
  );
}

export default App;
