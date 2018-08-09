import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  AppRegistry
} from "react-native";

export default class GeneralControls extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.buttonContainerUpDown}>
          <TouchableOpacity
            style={[styles.topicButton, styles.down]}
            onPress={() => this.props.showTopics()}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.topCard, styles.up]}>
            <View style={styles.leftSide}>
              <Image
                source={{ uri: this.props.authorPath }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.headline}>{this.props.headline}</Text>
              <Text style={styles.subline}>{this.props.subline}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white"
  },

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
    marginLeft: 8,
    marginRight: 8,
    marginTop: -620
  },
  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "center",

    marginTop: -600,
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
    width: 100
  },
  topCard: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 40,
    height: 80,
    width: "90%"
  },

  rightSide: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 70,
    display: "flex",
    flexDirection: "column"
  },
  leftSide: {
    display: "flex",
    flexDirection: "column"
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
