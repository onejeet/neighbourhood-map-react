# Neighborhood Map React

A single-page web application, built using the Reactjs. It displays a Google Map of Hyderabad area, marking the famous Shopping Malls. Users can search shopping malls and, when selected, additional information about the mall is presented from the FourSquare APIs.

## Features

1. Type into the search box to filter the items in the list and the markers on the map simultaneously.
2. When user clicks the item in sidebar, it triggers the corresponding information box with a little bounce of marker on map. Also, the Focus traps inside the information Box. On Close the focus returns to the sidebar menu.
3. Hamburger icon helps in hiding or displaying the sidebar. But below the screen width 992px, the side bar closes automatically when a item is clicked to ensure better visibility on smaller devices.
4. First tab brings the focus on Hamburger icon, which will continue to the side bar search and items.
5. Clicking any marker will be displaying the information box related to that place with a trapped focus.
6. Offline First Implementation. App is fully Offline accessible using Service Worker. **Service Worker Implementation only works in Prodution Mode**
7. Accessiblility (a11y) targeted code.


## How to run the project in Development Mode
- make sure the `node` and `git` is installed on your system.
- clone the repo `git clone https://github.com/onejeet/react-neighbourhood-map.git`
- get inside the directory `cd react-neighbourhood-map`
- install all the dependencies `npm install`
- Launch the app in **Development Mode** `npm start`

A new browser window open automatically in your browser displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

***NOTE:*** *The service workers installs in Development mode as well but caches the app only when it is in production mode.*

## How to run the project in Production Mode

1. Build the production ready optimised code. `npm run build`
2. Install the NPM's static server globally `npm install -g serve`. Ignore if already installed
3. Launch the Production version of app `serve -s build`
4. Open new tab in your browser and navigate to the url [http://localhost:5000/](http://localhost:5000/) to launch the app in production mode.

## Guidelines

This Project followed the Rubric provided by the udacity.
[Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)

## Resources

- Create-React-App Module from Facebook
- NPM Modules
- Udacity Frontend Nano-degree Course Material
- Google Maps APIs
- FourSquare Venues APIs
