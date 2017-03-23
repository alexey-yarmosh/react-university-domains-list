import React, { Component } from 'react';
import { loadUniversities } from './services';
import { AppHeader } from './AppHeader/AppHeader.react';
import { UniversitiesForm } from './UniversitiesForm/UniversitiesForm.react';
import { UniversitiesTable } from './UniversitiesTable/UniversitiesTable.react';
import './App.css';

let allUniversities = [];

class App extends Component {
  state = {
    validUniversities: [],
    lastDisplayedUnv: 0,
    nameValue: '',
    countryValue: ''
  }

  componentDidMount() {
    loadUniversities()
      .then(universitiesData => {
        allUniversities = universitiesData;
      })
      .then(() => {
        this.filterUniversities('', '');
      });
  }

  filterUniversities = (nameValue, countryValue) => {
    const validUniversities = allUniversities.filter(university => {
      return university.name.includes(nameValue) && university.country.includes(countryValue);
    });
    this.setState({
      validUniversities,
      lastDisplayedUnv: 0
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const nameValue = e.target.children[0].value;
    const countryValue = e.target.children[1].value;
    this.filterUniversities(nameValue, countryValue);
  }

  loadItems = () => {
    if (this.state.validUniversities.length === 0) {
      return;
    }

    const lastDisplayedUnvUpd = this.state.lastDisplayedUnv + 1;
    this.setState({
      lastDisplayedUnv: lastDisplayedUnvUpd
    })
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <UniversitiesForm
          handleSubmit={this.handleSubmit}
        />
        <UniversitiesTable
          validUniversities={this.state.validUniversities}
          lastDisplayedUnv={this.state.lastDisplayedUnv}
          loadItems={this.loadItems}
        />
      </div>
    );
  }
}

export default App;
