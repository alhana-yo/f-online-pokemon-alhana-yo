import React, { Component } from 'react';
import PokeCard from './PokeCard';
import '../styles/components/PokeList.css';


class PokeList extends Component {
  render() {
    const pokemonList = this.props.pokemons;
    return (
            <ul className="cards__list">

                {pokemonList.map(pokemon => {
                    return (
                        <li className="cards__list--element">
                            <PokeCard 
                                urlImage={pokemon.sprites.front_default}
                                id={pokemon.id}
                                name={pokemon.name}
                                types={pokemon.types}

                            />
                        </li>
                    );
                })}
            </ul>
    );
  }
}

export default PokeList;