import React, { Component } from 'react';
import Stream from './Stream';

//PubNub publish and subscribe keys to use to communicate with the website
const pubkey = 'pub-c-f5c65533-d030-42ea-b1b3-a4bd12c3d476';
const subkey = 'sub-c-abda1f6e-74c3-11e9-a1d6-2a8c316da507';

//This channel is where the GeoJSON data will come from
const channel = 'mychannel';

//This token is where the map from Mapbox will be shown from
const mapboxToken = 'pk.eyJ1IjoiYWx3NjE1IiwiYSI6IktCMDhKQjQifQ.qrZFvOZzG4qDyCxD1lZzNQ';

class App extends Component {
  render() {
    return <Stream publish={pubkey} subscribe={subkey} channel={channel} mapbox={mapboxToken}/>;
  }
}

export default App;
