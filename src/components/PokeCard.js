import React, { Component } from 'react';
import '../styles/components/PokeCard.css';


class PokeCard extends Component {
    render() { 
        //debugger;
        return (
            <section className="card">
                <div className={`card__item card__item--${this.props.name}`}>
                    <div className="card__header">
                        <img className="card__image" src={this.props.urlImage} alt={`Imagen de ${this.props.name}`} />
                        <h2 className="card__id">ID/{this.props.id}</h2>
                    </div>
                    <h2 className="card__name">{this.props.name}</h2>

                    <ul className="card__types">

                        {this.props.types.map((element, index) => {
                            return (
                                <li className={`card__type--element card__type--element${index}`}>
                                    <div className="type">
                                        {element.type.name}

                                    </div>

                                </li>
                            );

                        })}

                    </ul>

                </div>


            </section>
    );
    }
}

export default PokeCard;