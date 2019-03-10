import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Filter.css';

class Filter extends Component {
    render() {
        return (
            <div className="app__input">
            <div className="app__filter-itm">
              <input type="text" className="app__filter-full-name" placeholder="Busca tus Pokemons favoritos" onKeyUp={this.props.actionGetUserInput}/>
            </div>
          </div>
        );
    }
}

Filter.propTypes = {
    arrayFromFilter: PropTypes.func
}

export default Filter;