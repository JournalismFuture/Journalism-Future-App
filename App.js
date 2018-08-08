import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  AppRegistry
} from "react-native";
import { MapView } from "expo";

const DEFAULT_PADDING = { top: 500, right: 100, bottom: 100, left: 100 };

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headline: "",
      subline: "",
      currentMarker: 0,
      markers: [],
      isLoading: true,
      prevPos: null,
      curPos: { latitude: 40.76727216, longitude: -73.99392888 },
      curAng: 45,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    this.showTopics = this.showTopics.bind(this);
    this.markerClick = this.markerClick.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.fitAllMarkers = this.fitAllMarkers.bind(this);
    this.nextTopic = this.nextTopic.bind(this);
    this.regionChange = this.regionChange.bind(this);
  }

  fetchMarkerData() {
    fetch("http://192.168.1.106:3000/data/test_data.json")
      .then(response => response.json())
      .then(responseJson => {
        console.log("success ", responseJson);

        this.setState({
          isLoading: false,
          markers: responseJson.politics,
          headline: responseJson.politics[0].headline,
          subline: responseJson.politics[0].subline
        });
        this.fitAllMarkers(responseJson.politics);
      })
      .catch(error => {
        console.log(error);
      });
  }

  fitAllMarkers(markers) {
    console.log("FitAllMarkers..");

    this.map.fitToCoordinates(markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });
  }

  updateMap(lat, lon) {
    this.map.animateToCoordinate({ latitude: lat, longitude: lon }, 1000);
    console.log(lat, lon);
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  markerClick(marker, index) {
    this.setState({
      headline: marker.headline,
      subline: marker.subline,
      currentMarker: index
    });
  }

  nextTopic(direction) {
    var newCurrentMarker;
    if (direction == 1) {
      newCurrentMarker = 0;
      if (this.state.currentMarker + 1 < this.state.markers.length) {
        newCurrentMarker = this.state.currentMarker + 1;
      }
    } else {
      newCurrentMarker = this.state.currentMarker - 1;
      if (this.state.currentMarker - 1 < 0) {
        newCurrentMarker = this.state.markers.length - 1;
      }
    }

    console.log(newCurrentMarker);

    var marker = this.state.markers[newCurrentMarker];

    var oldLatitude = this.state.markers[this.state.currentMarker].latitude;
    var oldLongitude = this.state.markers[this.state.currentMarker].longitude;

    var newLatitude = marker.latitude;
    var newLongtitude = marker.longitude;

    console.log(oldLatitude, oldLongitude, newLatitude, newLongtitude);
    var newLongitudeDelta = Math.abs(oldLongitude - newLongtitude);
    var newLatitudeDelta = Math.abs(oldLatitude - newLatitude);

    this.setState({
      headline: marker.headline,
      subline: marker.subline,
      currentMarker: newCurrentMarker,
      longitudeDelta: newLongitudeDelta,
      latitudeDelta: newLatitudeDelta,
      curPos: {
        latitude: newLatitude,
        longitude: newLongtitude
      }
    });

    this.updateMap(newLatitude, newLongtitude);
  }
  showTopics() {}

  regionChange(e) {
    //console.log(e.latitude, e.longitude);
  }

  render() {
    return (
      <View style={styles.flex}>
        <MapView
          onRegionChange={region => this.regionChange(region)}
          ref={el => (this.map = el)}
          style={styles.flex}
          initialRegion={{
            ...this.state.curPos,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
        >
          {this.state.isLoading
            ? null
            : this.state.markers.map((marker, index) => {
                const coords = {
                  latitude: marker.latitude,
                  longitude: marker.longitude
                };

                return this.state.currentMarker != index ? (
                  <MapView.Marker.Animated
                    pinColor={"rgba(63, 148, 136,1)"}
                    key={index}
                    coordinate={coords}
                    onPress={() => this.markerClick(marker, index)}
                  />
                ) : (
                  <MapView.Marker.Animated
                    pinColor={"rgb(232, 88, 191)"}
                    key={index}
                    coordinate={coords}
                    onPress={() => this.markerClick(marker, index)}
                  />
                );
              })}
        </MapView>
        <View style={styles.buttonContainerUpDown}>
          <TouchableOpacity
            style={[styles.topicButton, styles.down]}
            onPress={() => this.showTopics()}
          >
            <Text style={styles.text}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.topCard, styles.up]}
            onPress={() => this.showTopics()}
          >
            <Text style={styles.headline}>{this.state.headline}</Text>
            <Text style={styles.subline}>{this.state.subline}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerLeftRight}>
          <TouchableOpacity
            style={[styles.storyButton, styles.left]}
            onPress={() => this.nextTopic(-1)}
          >
            <Text style={styles.text}>l</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.storyButton, styles.right]}
            onPress={() => this.nextTopic(1)}
          >
            <Text style={styles.text}>r</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: "100%"
  },

  headline: {
    fontSize: 16,
    color: "black"
  },
  subline: {
    fontSize: 12,
    color: "rgb(127,127,127)"
  },

  buttonContainerLeftRight: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "center",
    margin: 8
  },
  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 16
  },
  text: { color: "white" },
  storyButton: {
    backgroundColor: "rgba(63, 148, 136,1)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 30,
    width: 30
  },
  topicButton: {
    backgroundColor: "rgba(63, 148, 136,1)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    height: 50,
    width: 50
  },
  topCard: {
    backgroundColor: "rgba(255, 255, 255,1)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    height: 80,
    width: "90%"
  },
  up: {
    alignSelf: "flex-start"
  },
  down: {
    alignSelf: "flex-end"
  },
  left: {
    alignSelf: "flex-start"
  },
  right: {
    alignSelf: "flex-end"
  }
});
