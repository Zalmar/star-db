import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service'
import Row from '../row/row';

import './people-page.css';

export default class PeoplePage extends Component {
    
    swapiService = new SwapiService();
    
    state = {
        selectedPerson: 1,
        hasError: false
    };
    
    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
      };

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {

        if (this.state.hasError){
            return (<ErrorIndicator />)
        }

        const itemList = (
            <ItemList  
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPerson} 
                renderItem={(item) => `${item.name} (${item.gender})`}
            />
        );

        const personDetails = (
            <PersonDetails 
                personId={this.state.selectedPerson}
            />
        );

        return (
            <Row left={ itemList } right={ personDetails }/>
        )
    }
}