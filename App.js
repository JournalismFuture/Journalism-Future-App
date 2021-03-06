import React from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  AppRegistry
} from "react-native";
import { MapView, Polyline } from "expo";

import GeneralControls from "./components/generalControls.js";
import StoryOverviewControls from "./components/storyOverviewControls.js";
import StoryControls from "./components/storyControls.js";
import Profile from "./components/profile.js";

const DEFAULT_PADDING = { top: 500, right: 100, bottom: 100, left: 100 };
const DEFAULT_LATITUDE = 40.76727216;
const DEFAULT_LONGITUDE = -73.99392888;
const DEFAULT_DETAIL_OFFSET = 0.03053826679;
const DEFAULT_LATITUDE_DELTA = 8.563216329243893;
const DEFAULT_LONGITUDE_DELLTA = 7.910157255828381;
const JOURNALISM_FUTURE_API = "http://leonerath.de:8081/api/article/getAll";
const DEFAUlT_ANIMATION_LENGTH = 1000;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleState: 1,
      zoomLevel: 6,
      authorPath: "./Images/default.jpg",
      headline: "",
      subline: "",
      content: "",
      currentMarker: 0,
      oldMarkers: [],
      markers: [],
      polylines: [],
      isLoading: true,
      prevPos: null,
      curPos: { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE },
      curAng: 45,
      latitudeDelta: DEFAULT_LATITUDE_DELTA,
      longitudeDelta: DEFAULT_LONGITUDE_DELLTA
    };
    this.showProfile = this.showProfile.bind(this);
    this.markerClick = this.markerClick.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.fitAllMarkers = this.fitAllMarkers.bind(this);
    this.nextTopic = this.nextTopic.bind(this);
    this.regionChange = this.regionChange.bind(this);
    this.showStory = this.showStory.bind(this);
    this.handleBackPress = this.handleBackPress.bind(this);
    this.startArticleTour = this.startArticleTour.bind(this);
    this.closeProfile = this.closeProfile.bind(this);
  }

  closeProfile() {
    this.setState({
      articleState: 1,
      markers: this.state.oldMarkers,
      oldMarkers: []
    });
  }

  fetchMarkerData() {
    fetch(JOURNALISM_FUTURE_API)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          oldMarkers: [],
          markers: responseJson,
          authorPath: responseJson[0].author.imagePath,
          headline: responseJson[0].headline,
          subline: responseJson[0].subline,
          curPos: {
            latitude: responseJson[0].latitude,
            longitude: responseJson[0].longitude
          }
        });
        this.updateMap(
          markers[0].latitude,
          markers[0].longitude,
          DEFAUlT_ANIMATION_LENGTH
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  fitAllMarkers(markers) {
    this.map.fitToCoordinates(markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });
  }
  handleBackPress = () => {
    console.log("trigger");

    if (this.state.articleState == 2) {
      var marker = this.state.oldMarkers[this.state.currentMarker];

      this.setState({
        markers: this.state.oldMarkers,
        oldMarkers: [],
        articleState: 1
      });

      this.map.animateToRegion(
        {
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LONGITUDE_DELLTA
        },
        1000
      );
      //this.setState({ zoomLevel: 6 });
      //this.updateMap(marker.latitude, marker.longitude, 1000);
    }
    return true;
  };
  updateMap(lat, lon, duration) {
    this.map.animateToCoordinate({ latitude: lat, longitude: lon }, duration);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.fetchMarkerData();
  }

  markerClick(marker, index) {
    this.setState({
      authorPath: marker.author.imagePath,
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

    var marker = this.state.markers[newCurrentMarker];

    var oldLatitude = this.state.markers[this.state.currentMarker].latitude;
    var oldLongitude = this.state.markers[this.state.currentMarker].longitude;

    var newLatitude = marker.latitude;
    var newLongtitude = marker.longitude;

    var newLongitudeDelta = Math.abs(oldLongitude - newLongtitude);
    var newLatitudeDelta = Math.abs(oldLatitude - newLatitude);

    console.log(marker.author.imagePath);

    this.setState({
      authorPath: marker.author.imagePath,
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
    var diffLat = Math.abs(oldLatitude - newLatitude);
    var diffLon = Math.abs(oldLongitude - newLongtitude);

    var diff = diffLat + diffLon;
    var duration = (diff * 100) / 2;
    if (duration < 1000) {
      duration = DEFAUlT_ANIMATION_LENGTH;
    }

    this.updateMap(newLatitude, newLongtitude, duration);
  }
  showProfile() {
    this.setState({
      oldMarkers: this.state.markers,
      markers: [],
      polylines: [],
      articleState: 0
    });
  }

  startArticleTour() {
    var marker = this.state.markers[0];
    this.setState({
      markers: [marker],
      polylines: [],
      content: marker.content,
      headline: marker.headline,
      articleState: 3,
      zoomLevel: 12
    });
    this.map.fitToCoordinates(
      [
        {
          latitude: marker.latitude - DEFAULT_DETAIL_OFFSET,
          longitude: marker.longitude
        }
      ],
      {
        edgePadding: { top: 0, right: 0, bottom: 3300, left: 0 },
        animated: true
      }
    );
  }

  showStory(currentMarkerPosition) {
    var marker = this.state.markers[currentMarkerPosition];

    this.setState({
      oldMarkers: this.state.markers,
      markers: marker.story,
      polylines: marker.polylines,
      articleState: 2,
      zoomLevel: 12
    });
    this.fitAllMarkers(marker.story);
  }

  regionChange(e) {
    // console.log(
    //   e.latitude,
    //   e.longitude,
    //   this.state.markers[0].latitude - e.latitude,
    //   this.state.markers[0].longitude - e.longitude
    // );
  }

  render() {
    return (
      <View style={styles.main}>
        <MapView
          mapType="mutedStandard"
          showsCompass={false}
          showsPointsOfInterest={false}
          showsMyLocationButton={false}
          showsTraffic={false}
          showsIndoors={false}
          cacheEnabled={true}
          maxZoomLevel={this.state.zoomLevel}
          onRegionChange={region => this.regionChange(region)}
          ref={el => (this.map = el)}
          style={styles.map}
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
          {!this.state.isLoading &&
            this.state.articleState == 2 &&
            this.state.polylines.map(polyline => (
              <MapView.Polyline
                key={polyline.id}
                coordinates={polyline.coordinates}
                strokeColor="rgba(159, 159, 159,1)"
                fillColor="rgba(159, 159, 159,1)"
                strokeWidth={1}
              />
            ))}
        </MapView>
        {this.state.articleState == 0 && (
          <Profile closeProfile={this.closeProfile} style={styles.overlay} />
        )}
        {this.state.articleState == 1 &&
          !this.state.isLoading && (
            <GeneralControls
              style={styles.overlay}
              currentMarker={this.state.currentMarker}
              showStory={this.showStory}
              showProfile={this.showProfile}
              nextTopic={this.nextTopic}
              authorPath={this.state.authorPath}
              headline={this.state.headline}
              subline={this.state.subline}
            />
          )}
        {this.state.articleState == 2 && (
          <StoryOverviewControls
            style={styles.overlay}
            startArticleTour={this.startArticleTour}
            showProfile={this.showProfile}
            authorPath={this.state.authorPath}
            headline={this.state.headline}
            subline={this.state.subline}
          />
        )}
        {this.state.articleState == 3 && (
          <StoryControls
            style={styles.overlay}
            content={this.state.content}
            showStory={this.showStory}
            showProfile={this.showProfile}
            nextTopic={this.nextTopic}
            authorPath={this.state.authorPath}
            headline={this.state.headline}
            subline={this.state.subline}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%"
  },
  map: {
    flex: 1,
    width: "100%"
  },
  overlay: {}
});
