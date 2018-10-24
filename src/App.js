import React, { Component } from 'react';
import './App.css';
import Map from './map.js';
import $ from 'jquery';

class App extends Component {
    state = {
        sidebar : 'closed'
    }

    componentDidMount(){
        //Add Interactivity for Enter Key to improve a11y
        $('#hamburger-icon').keypress(function(event) {
            if (event.which === 13) {
                $(event.target).click();
                return false;
            }
        });
    }

    toggleSidebar = () => {
        //Open and close sidebar function
        if(this.state.sidebar === 'open'){
            $('.sidebar').removeClass('showSidebar');
            this.setState({sidebar: 'closed'});
            $('#hamburger-icon').removeClass("change");
        }else{
            $('.sidebar').addClass('showSidebar');
            this.setState({sidebar: 'open'});
            $('#hamburger-icon').addClass("change");
        }
    }

    render() {
        return(
            <div className="app">
                <header className="header">
                    <div className="logo">Hyderabad Malls</div>
                </header>
                <div id="hamburger-icon" tabIndex="0" onClick={this.toggleSidebar}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <Map google={this.props.google} tabIndex="-1" toggleSidebar={this.toggleSidebar} />
            </div>
        );
    }
}

export default App;
