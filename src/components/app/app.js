import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry/error-boundry';
import ErrorIndicator from '../error-indicator';
import ItemDetails, { Record } from '../item-details/item-details';
import ItemList from '../item-list';

import './app.css';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    onPersonSelected = (id) => {
        this.setState({ selectedPerson: id })
    }

    componentDidCatch() {
        this.setState({ hasError: true})
    }

    render() {

        if (this.state.hasError) {
            return (
                <ErrorIndicator />
            )
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        const { getPerson,
                getStarships,
                getPersonImage,
                getStarshipImage,
                getAllPerson,
                getAllPlanets } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >
              
                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
        );
              
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarships}
                getImageUrl={getStarshipImage}>
              
                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header />
                    <ItemList
                        getData={getAllPerson}
                        onItemSelected={() => {}}>

                        { ({name}) => <span>{name}</span> }
                    </ItemList>
                    <ItemList
                        getData={getAllPlanets}
                        onItemSelected={() => {}}>

                        { ({name}) => <span>{name}</span> }
                    </ItemList>
                </div>
            </ErrorBoundry>
        )
    }
}
