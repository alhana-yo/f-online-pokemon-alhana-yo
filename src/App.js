import React, { Component } from 'react';
import PokeList from './components/PokeList';
//import logo from './logo.svg';
import './styles/App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      pokemons: []

    }
  }

  /** REQUEST FOR THE SERVER */
  // fetch es una función que devuelve una promesa. una promesa es un objeto JS, pero este tiene un metodo que es then.
  // Esta función recibe por parametro un callback (una funcion) que se va a encargar de ejecutar cuando el objeto (la promesa) sepa qeu se ha resuelto.
  // El objeto promesa es una función y tiene un método then. Cuando termina 
  getData(){ 
    const endpoint = 'http://pokeapi.salestock.net/api/v2/pokemon/?limit=25';
    fetch(endpoint) // me devuelve una promesa, que cuando se resuelve, se convierte en un objeto response. con lo cual puedo hacer un .then
    .then(response => response.clone().json()) // Con la respuesta podemos hacer lo que queramos. En este caso, aplicamos al response el metodo .json que devuelve una promesa, y nos va a devolver el formato JSON una vez se haya resuelto sea promesa.
    .then(function(data) { // en data ya tengo la respuesta en formato JSON

      //hay que hacer lo mismo, pero para muchas peticiones
      // 1- HAcemos un array donde guardamos todas las urls donde hay que hacer las peticiones0
      // 2- por cada url hay que hacer un fetch con esa url
      // 3- lo que me devuelve fetch(que son promesas) se guarda en cada posición del array
      // Promise.all trata un array que contiene promesas. HAsta que no se resuelvan todas las promesas que hay dentro del array no va a saltar el .then o el .catch (si falla) (o el reject) VER DIFERENCIA ENTRE AMBOS


      const promises = data.results.map(item => fetch(item.url));
      return Promise.all(promises);
      
    })
    //cuadno se resuelven todas las promesas, pasamos al siguiente .then
    // responses es un array que contiene objetos tipo response 
    .then(responses => Promise.all(responses.map(response => response.clone().json())))
    .then(results => { 
      //debugger;
      this.setState({
        pokemons: results
      });

      this.savedDataInLS(results);
      debugger;
    
    });
  }

  componentDidMount() {
    //this.getData();
    this.getSavedDataFromLS();
  }

  /** LOCAL STORAGE */

  savedDataInLS(data){
    localStorage.setItem('Pokemons_info', JSON.stringify(data));
  }

  getSavedDataFromLS(){
    const savedData = localStorage.getItem('Pokemons_info');
   
    if(savedData !== null){
      this.setState({
        pokemons: JSON.parse(savedData)
      });
      //debugger;
    }else{
      this.getData();
    }
  }


  render() {

    return (
      <React.Fragment>
        <header className="App-header">

        </header>
        <body className="App-body">
          <PokeList />
        </body>
      </React.Fragment>
    );
  }
}

export default App;
