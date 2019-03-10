import React, { Component } from 'react';
import PokeList from './components/PokeList';
import Filter from './components/Filter';
//import logo from './logo.svg';
import './styles/App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      query:'',
      pokemons: []
    }
    this.getUserInput = this.getUserInput.bind(this);
  }

  /** REQUEST FOR THE SERVER */

  getData(){ 
    const endpoint = 'http://pokeapi.salestock.net/api/v2/pokemon/?limit=25';
    fetch(endpoint) 
    .then(response => response.clone().json()) 
    .then(function(data) { 

      const promises = data.results.map(item => fetch(item.url));
      return Promise.all(promises);
      
    })
  
    .then(responses => Promise.all(responses.map(response => response.clone().json())))
    .then(results => { 
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

  /** FILTER */
  
  getUserInput(e) {
    const userQuery = e.currentTarget.value;
    this.setState({
      query: userQuery
    });
  }

  filterData(){
    //debugger;
    const filteredPokemons = this.state.pokemons.filter(item => 
      item.name.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())
    );
    return filteredPokemons;
  }
  
  render() {
    const arrayFromFilter = this.filterData();

    return (
      <React.Fragment>
        <header className="App-header">
          <Filter actionGetUserInput={this.getUserInput}/>
        </header>
        <body className="App-body">
          <PokeList pokemons={arrayFromFilter}/>
        </body>
      </React.Fragment>
    );
  }
}

export default App;
