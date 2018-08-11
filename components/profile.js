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
          <View style={styles.flexRow}>
            <View style={styles.flexRow2}>
              <Image
                style={styles.iconStyle}
                source={require("../Icons/stats_black.png")}
              />
              <Text style={styles.textStyle}>Statistiken</Text>
            </View>
            <View style={styles.flexRow2}>
              <Image
                style={styles.iconStyle}
                source={require("../Icons/bookmark_black.png")}
              />
              <Text style={styles.textStyle}>Offline Artikel</Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexRow2}>
              <Image
                style={styles.iconStyle}
                source={require("../Icons/quote_black.png")}
              />
              <Text style={styles.textStyle}>Zitate</Text>
            </View>
            <View style={styles.flexRow2}>
              <Image
                style={styles.iconStyle}
                source={require("../Icons/settings_black.png")}
              />
              <Text style={styles.textStyle}>Einstellungen</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.dismissButton, styles.down]}
          onPress={() => this.props.closeProfile()}
        >
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
  textStyle: {
    margin: 8,
    width: "100%"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    margin: 8
  },
  flexRow2: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "50%"
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
  iconStyle: {
    width: 30,
    height: 30
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
