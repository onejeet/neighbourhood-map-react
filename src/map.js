import React, { Component } from 'react';
import { Locations } from './locations.js';
import escapeRegExp from 'escape-string-regexp';
import Sidebar from './sidebar.js';
import $ from 'jquery';

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
        // initialising the map of Hyderabad
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
        const {tips,allPlaces} = this.state
        var flag = true;
        allPlaces.forEach(place => {

        const clientId = "JOM235CWVCY4NL3D30035XZHM2P2PBN0CDZ34FRGX2X25WTK";
        const clientSecret = "0TFK5GIHLWAVRNJ0KLOFIVCCAMK2ZACQBDIPP4NEDMK0VZXH";
        const url = `https://api.foursquare.com/v2/venues/${place.venue_id}/tips?&client_id=${clientId}&client_secret=${clientSecret}&v=20181026`;

        //fetch data from foursquare
        fetch(url)
        .then((response) => {
            let response2 = response.clone();
            response.json().then((data) => {
            let tip
            // handle Errors
            if (response.status === 200) {
                if(data.response.tips.items[0]){
                    tip = {text: data.response.tips.items[0].text, name: place.name, position: place.position, feedback: data.response.tips.count}
                }
                else{
                    tip = {text: 'No user feedback available', name: place.name, position: place.position,feedback: 0}
                }
            } else {
                tip = {text:"Sorry, Unable to retrieve data from Foursquare", name: place.name, position: place.position, feedback:'No Data Fetched'}
            }
            tips.push(tip);
            this.setState(tips);
            this.addMarker(this.state.map, tip);
        })
        return response2;
        })
        //add urls to the cache
        .then(function (res) {
            navigator.serviceWorker.ready.then(function(registration){
                let cacheName = 'onejeet-react-app';
                return caches.open(cacheName).then(function (cache) {
                    cache.put(url, res);
                    console.log('FourSquare Data Fetched & Cached');
                });
            });
        }).catch(() => {
            if(flag){
                alert(`Sorry, Unable to retrieve data from Foursquare. Please try again later.`);
            }
            flag = false;
            })
        })
    }

    componentDidUpdate(){
        //add bounds
        const {markers,map} = this.state;
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
            feedback: place.feedback,
            animation: window.google.maps.Animation.DROP,
        });
        //open informationBox content on marker click
        marker.addListener('click', () => {
            this.state.map.panTo(marker.getPosition());
            this.state.informationBox.setContent(`
            <div class="informationBox" tabIndex="1" aria-modal="true">
                <div name="${marker.title}">
                    <h3 tabIndex="1">${marker.title}</h3>
                    <p tabIndex="1">${marker.text}</p>
                    <p tabIndex="1">Total Feedbacks: ${marker.feedback}</p>
                    <p tabIndex="1">Data is fetched from Foursquare.</p>
                </div>
                </div>`);
            this.state.informationBox.open(map, marker);

            window.google.maps.event.addListener(this.state.informationBox, 'domready', function(){
                //Set Alt Tag for InfoWindow Close Button
                $('button.gm-ui-hover-effect img').attr('alt','close');
                //trap the focus inside infowWindow
                let firstTabbable = $('.informationBox');
                let lastTabbable = $('button.gm-ui-hover-effect');
                lastTabbable.attr('tabIndex','1');
                firstTabbable.focus();
                lastTabbable.keydown(function(e){
                    if ((e.which === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        firstTabbable.focus();
                    }
                });
                firstTabbable.keydown(function(e){
                    if ((e.which === 9 && e.shiftKey)) {
                        e.preventDefault();
                        lastTabbable.focus();
                    }
                });
                //close the InfoWindow on enter
                lastTabbable.keydown(function(e){
                    if (e.which === 13) {
                        e.preventDefault();
                        lastTabbable.click();
                    }
                });
            });
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

    updateResult = (query, map) => {
        this.setState({query: query})
        const {markers} = this.state
        //filter markers
        markers.forEach((marker) => {
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0){
                marker.setVisible(true);
                this.state.informationBox.close(map, marker);
            } else {
                marker.setVisible(false);
            }
        });
        this.setState({markers});
    };

    filterPlaces = (query, markers) => {
        let newPlaces;
        if (query){
            const match = new RegExp(escapeRegExp(query),'i');
            newPlaces = markers.filter((marker)=>match.test(marker.title))
        }
        else{
          newPlaces=markers;
        }
        return newPlaces;
    }

    render() {
        const {query} = this.state;
        const {markers} = this.state
        let searchedPlaces = this.filterPlaces(query, markers);
        return (
            <main className="container" role="main">
                <Sidebar
                updateResult= {this.updateResult}
                query={this.state.query}
                map={this.state.map}
                searchedPlaces={searchedPlaces}
                marker={this.state.markers}
                informationBox={this.state.informationBox}
                toggleSidebar={this.props.toggleSidebar}
                />
                <div className="map-container" tabIndex="-1">
                    <div id="map" role="application"/>
                </div>
            </main>
        );
    }
}

function loadScript(url) {
    var newScript = document.createElement("script");
    // newScript.onerror = alert('Google Map Not Loaded!');
    document.head.appendChild(newScript);
    newScript.src = url;
    newScript.async = true;
}
export default Map;
