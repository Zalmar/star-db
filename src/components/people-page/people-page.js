import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {
    
    swapiService = new SwapiService();
    
    state = {
        selectedPerson: 1,
    };
    
    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
      };

    render() {

        const itemList = (
            <ItemList  
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPerson}>
                { (i) => (
                    `${i.name} (${i.gender})`
                ) }
            </ItemList>

        );

        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson} />
            </ErrorBoundry>
        );

        return (
            <ErrorBoundry>
                <Row left={ itemList } right={ personDetails }/>
            </ErrorBoundry>
        )
    }
}