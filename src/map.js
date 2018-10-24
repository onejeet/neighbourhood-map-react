import React, { Component } from 'react';
import { Locations } from './locations.js'

class Map extends Component {
    state = {
        map: { loaded: true },
        informationBox: {},
        allPlaces : Locations,
        markers: [],
        query:'',
        tips:[],
    }

    componentDidMount(){
        window.initMap = this.initMap;
        loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB-Qm2gTBeiX0PiY14ijGy8JZ_s5S-OQH4&callback=initMap')
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 17.3924137, lng: 78.4653866},
            zoom:11,
        });
        const informationBox = new window.google.maps.InfoWindow({
            content: 'content'
        });
        this.setState({map, informationBox});
        this.loadPlacesData();
    }

    loadPlacesData = () => {
        const {tips} = this.state
        this.state.allPlaces.forEach(place => {

        const clientId = "SBUBZ2B234WUQ5CKSPQXFPRDMFVCGFGQ1PA25VGNLFRZTPV0";
        const clientSecret = "HSLONZVWRKJF5TMQ2UUTA23EAO4MVINSOLD1ZCYFKXYWR2YH";
        const url = `https://api.foursquare.com/v2/venues/${place.venue_id}/tips?&client_id=${clientId}&client_secret=${clientSecret}&v=20181024`

        //fetch data from foursquare
        fetch(url)
        .then((response) => {
            response.json().then((data) => {
            let tip
            // handle Errors
            if (response.status === 200) {
                tip = {text: data.response.tips.items[0].text, name: place.name, position: place.position}
            } else {
                tip = {text:"Unable to retrieve data from Foursquare", name: place.name, position: place.position}
            }
            tips.push(tip);
            this.setState(tips);
            this.addMarker(this.state.map, tip);
        })
    }).catch(error => alert(`Unable to retrieve data from Foursquare. Try again later.`, error));
        })
    }

    componentDidUpdate(){
        //add bounds
        const {markers,map} = this.state
        if (!map.loaded) {
        let bounds = new window.google.maps.LatLngBounds();

        markers.forEach((m)=>
        bounds.extend(m.position))
        map.fitBounds(bounds)
        }
    }

    addMarker = (map, place) => {
        const {markers} = this.state;
        //add marker
        if (!map.loaded) {
        const marker = new window.google.maps.Marker({
            position: {lat: place.position.lat, lng: place.position.lng},
            map,
            text: place.text,
            title: place.name,
            animation: window.google.maps.Animation.DROP,
        });
        //open informationBox content on marker click
        marker.addListener('click', () => {
            this.state.map.panTo(marker.getPosition());
            this.state.informationBox.setContent(`
            <div class="informationBox" tabIndex="3">
                <div name=${marker.title}>
                    <h3>${marker.title}</h3>
                    <p>${marker.text}</p>
                    <p>Tips provided by <a href="https://foursquare.com/">Foursquare</a></p>
                </div>
                </div>`);
            this.state.informationBox.open(map, marker)
        });
        //animation marker bounce on mouseover
        marker.addListener('mouseover', function() {
            this.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(() => this.setAnimation(null), 400)
        });
        markers.push(marker)
        this.setState({markers})
    }
    }

    render() {
        return (
            <div className="container" role="main">
                <div className="map-container">
                    <div id="map" role="application"/>
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
