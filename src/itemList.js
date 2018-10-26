import React, { Component } from 'react';
import $ from 'jquery';



class Item extends Component{

    //open marker function opens the marker when clicked on listItem
    openMarker = () => {
        const {map, informationBox, marker, toggleSidebar} = this.props;
        if(window.innerWidth <= 991){
            toggleSidebar();
        }
        map.panTo(marker.getPosition());
        informationBox.setContent(
            `<div id="infoBox" class="informationBox" tabIndex="1" aria-modal="true">
            <div name="${ marker.title }">
                <h3 tabIndex="1">${marker.title}</h3>
                <p tabIndex="1">${marker.text}</p>
            </div>
            </div>`
        );
        //marker animation bounce when clicked on the listItem
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null)
        }, 800);
        informationBox.open(map, marker);
        window.google.maps.event.addListener(informationBox, 'domready', function(){
            let tabbableItem = $('.location-list li.active');
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
            lastTabbable.keydown(function(e){
                if (e.which === 13) {
                    e.preventDefault();
                    lastTabbable.click();
                    tabbableItem.focus();
                }
            });
        });
    }

    componentDidMount(){
        const {marker} = this.props;
        //add active class when listItem is click
        $('.location-list li').click(function () {
            $('.location-list .active').removeClass('active');
            $(this).addClass('active');
        })
        marker.addListener("click", function() {
            $('.location-list .active').removeClass('active');
        });
        //Add Interactivity for Enter Key to improve a11y
        $('.location-list li').keypress(function(event) {
            if (event.which === 13) {
                $(event.target).click();
                return false;
            }
        });
    }

    render(){
        const {marker} = this.props;
        return(
                <li tabIndex="0" role="button" onClick={this.openMarker}>{marker.title}</li>
        )
    }
}

export default Item;
