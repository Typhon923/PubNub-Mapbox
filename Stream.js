import React, { Component } from 'react';
import PubnubReact from 'pubnub-react';
import Map from './Map';

//This class subscribes to the PubNub channel to get GeoJSON data
class Stream extends Component {
  constructor(props) {
    super(props);
    //Connection to PubNub starts here
    this.pubnub = new PubnubReact({
      publishKey: this.props.publish,
      subscribeKey: this.props.subscribe
    });
    //Initiates the connection to PubNub here
    this.pubnub.init(this, this.props.channel);
    this.state = {
      coords: null
    };
  }

  //If the application connects to PubNub successfully, this will activate
  componentDidMount() {
    //This sets up the map to listen for incoming data from PubNub channels and change the state of the Stream for each call it hears
    this.pubnub.addListener({message: msg => {
      console.log(msg);
      this.setState({ coords: msg.message }, () => {
        console.log(this.state.coords);
      });
    }});
    //This subscribes to the channel where the data is coming from
    this.pubnub.subscribe({
      channels: [this.props.channel]
    });
    console.log(this.props.channel);
  }

  //Renders the map with the given parameters
  render() {
    return <Map location={this.state.coords} token={this.props.mapbox} />;
  }
}

export default Stream;
