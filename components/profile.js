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

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.buttonContainerUpDown}>
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.profileBox}>
            <Image
              style={styles.profileImage}
              source={require("../Images/default.jpg")}
            />

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Leon Erath</Text>
              <Text style={styles.profileEmail}>leon-erath@hotmail.de</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.dismissButton, styles.down]}>
          <Image
            source={require("../Icons/dismiss-black.png")}
            style={{ width: 24, height: 24, margin: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "center",
    margin: 16
  },

  profileName: {
    fontSize: 16
  },
  profileEmail: {
    fontSize: 14,
    color: "rgb(127,127,127)"
  },
  profileCard: {
    backgroundColor: "rgb(255,255,255)",
    marginTop: 14,
    borderRadius: 24,
    height: "84%",
    width: "100%"
  },
  profileBox: {
    display: "flex",
    flexDirection: "row",
    margin: 8
  },
  dismissButton: {
    backgroundColor: "rgba(255, 255, 255,1)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    height: 50,
    width: 50
  },
  profileInfo: {
    justifyContent: "center",
    padding: 8
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40
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
