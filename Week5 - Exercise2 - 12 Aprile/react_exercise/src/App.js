import './App.css';
import {Header} from "./components/Header"
import {Description} from "./components/Description"
import {Card} from "./components/Card"
import {Form} from "./components/Form"
import {Footer} from "./components/Footer"

function App() {
  return (
    <div className="App">
      <Header/>
      <Description/>
      <div className="classWrapper">
        <Card title="Esperienze Lavorative" description="Ho salvato più volte l'umanità da pericolosi attacchi alieni."/>
        <Card title="Lingue" description="Parlo fluentemente 27 lingue."/>
        <Card title="Hobby" description="Mi piace coltivare patate."/>
      </div>
      <Form/>
      <Footer/>
    </div>
  );
}

export default App;
