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

export default class StoryControls extends React.Component {
  render() {
    return (
      <View style={styles.buttonContainerUpDown}>
        <View style={styles.flexSmall}>
          <View style={[styles.storyCard, styles.down]}>
            <Text style={styles.headline}>{this.props.headline}</Text>
            <Text style={styles.content}>{this.props.content}</Text>
          </View>
          <View style={styles.authorImage}>
            <Image
              source={{ uri: this.props.authorPath }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                alignSelf: "flex-end",
                marginRight: 30
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headline: {
    padding: 18,
    textAlign: "center",
    fontSize: 20,
    color: "black"
  },
  content: {
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(127,127,127)"
  },
  flexSmall: {
    display: "flex",
    width: "100%",
    height: "60%"
  },

  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: -30
  },

  storyCard: {
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255,1)",
    borderRadius: 25,
    width: "100%",
    height: "100%"
  },
  authorImage: {
    alignSelf: "flex-end",
    position: "absolute",
    width: "100%"
  },

  up: {
    alignSelf: "flex-start"
  },
  down: {
    alignSelf: "flex-end"
  }
});
