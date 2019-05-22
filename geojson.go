package main

import (
  "os"
  "log"
  "fmt"
  "io/ioutil"
  geojson "github.com/paulmach/go.geojson"
  pubnub "github.com/pubnub/go"
  )

//Main function. Publishes a GeoJSON file from this project to a channel in PubNub
func main() {

  //PubNub channel and starting GeoJSON file set here
  var channel = "mychannel"
  geojsonMap, err := os.Open("map.geojson")

  if err != nil {
    log.Print(err)
  } else {
    //Shows if the GeoJSON file is successfully opened
    fmt.Println("Successfully opened!")
  }

  defer geojsonMap.Close()

  rawGeoJSON, _ := ioutil.ReadAll(geojsonMap)

  //Turns the GeoJSON file into a Golang struct for the rest of the function to use
  regions, err2 := geojson.UnmarshalFeatureCollection(rawGeoJSON)

  //Checks for errors in translating the GeoJSON file
  if err2 != nil {
    log.Print(err2)
  } else {
    //Connection to PubNub starts here, using the given publish and subscribe keys
    config := pubnub.NewConfig()
    config.PublishKey = "pub-c-f5c65533-d030-42ea-b1b3-a4bd12c3d476"
    config.SubscribeKey = "sub-c-abda1f6e-74c3-11e9-a1d6-2a8c316da507"

    pn := pubnub.NewPubNub(config)

    //Actual message is sent to the PubNub channel here
    pn.Publish().Channel(channel).Message(regions).Execute()

    /*
    for i := 0; i < len(regions.Features); i++ {
      pn.Publish().Channel(channel).Message(regions.Features[i]).Execute()
    }
    */
  }
}
