import React, { Component } from 'react';

class Map extends Component {

    componentDidMount(){
        window.initMap = this.initMap;
        loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB-Qm2gTBeiX0PiY14ijGy8JZ_s5S-OQH4&callback=initMap')
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 17.3924137, lng: 78.4653866},
            zoom: 11,
        });
    }

    render() {
        return (
            <div className="map-container">
            <div className="container" role="main">
                <div className="map-container">
                    <div id="map" role="application"/>
                </div>
            </div>
            </div>
        );
    }
}

function loadScript(url) {
    var newScript = document.createElement("script");
    document.head.appendChild(newScript);
    newScript.src = url;
}
export default Map;
