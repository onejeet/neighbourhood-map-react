import React, { Component } from 'react';
import './App.css';
import Map from './map.js';

class App extends Component {


    render() {
        return(
            <div className="app">
                <header className="header">
                    <div className="logo">Hyderabad Malls</div>
                </header>
                <Map google={this.props.google} />
            </div>
        );
    }
}

export default App;
