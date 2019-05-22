import React, { PureComponent } from 'react';
import mapboxgl from 'mapbox-gl';
import start from './Start.json';

//This class renders the actual map on the browser screen
class Map extends PureComponent {
  map;
  increment = 0.01;

  constructor(props) {
    super(props);
    //Sets up the default view of where the map will start on the planet
    this.state = {
      zoom: 11,
      lng: -73.935242,
      lat: 40.730610
    };
    //Mapbox token to use to view within Mapbox is set here from App.js file
    mapboxgl.accessToken = this.props.token;
  }

  //This will fire when the map starts up the first time around
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    //Creates a new map within Mapbox
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });

    //Uses the default GeoJSON data to show on the map first
    this.map.on("load", () => {
      this.map.addSource("hotspot", {
        type: 'geojson',
        data: start, //Default data is from Start.json file
        buffer: 5
      });

      //This adds a visual layer of polygons contingent on the given GeoJSON data
      this.map.addLayer({
          id: 'new york',
          type: 'fill',
          source: 'hotspot',
          layout: {},
          paint: {
            'fill-color': '#931bc6',
            'fill-opacity': 0.8
          }
      });
    });
  }

  //This fires every time new data is given to the map from the PubNub stream
  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      console.log(this.props.location);
      //This basically replaces the current GeoJSON data with the new incoming GeoJSON and reloads the map with the new data
      let newMap = this.props.location;
      this.map.getSource("hotspot").setData(newMap);
    }
  }

  //Renders the map on screen using a bit of HTML
  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        style={{ height: "100vh", width: "100vw" }}
      />
    );
  }
}

export default Map;
