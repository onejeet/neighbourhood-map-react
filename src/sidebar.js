import React, { Component } from 'react';
import Item from './itemList'
import './App.css';

class Sidebar extends Component {
    render(){
        const {map,informationBox} = this.props;
        return (
            <div className="sidebar">
                <label htmlFor="search">Enter the Mall Name</label>
                <input id="search" tabIndex="1" aria-label="Search Malls"  placeholder="Search Malls"
                value={this.props.query}
                onChange={(event) => this.props.updateResult(event.target.value, map)}
                />
                <ul className="location-list">
                {this.props.searchedPlaces.map((marker) => (
                    <Item
                        key={marker.title} className=""
                        map={map}
                        marker={marker}
                        toggleSidebar={this.props.toggleSidebar}
                        informationBox={informationBox}/>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
