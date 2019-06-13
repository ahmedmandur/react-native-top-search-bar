import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import KeyboardListener from "react-native-keyboard-listener";

export default class App extends Component {
  state = {
    searchBarFocused: false,
    items: [],
    orgItems: [
      "Ahmed Mandour",
      "Emory Poole",
      "Ernestine Hogan",
      "Thurman Carrillo",
      "Douglass Compton",
      "Spencer Strong",
      "Damian Carr",
      "Santo Thompson",
      "Shelton Lewis",
      "Hershel Scott",
      "Kaitlin Morton",
      "Peter Benjamin",
      "Malcom Frey",
      "Huey Crosby",
      "Sang Fernandez",
      "Renee Terry",
      "Shane Rubio",
      "Alfredo Rogers",
      "Priscilla Friedman",
      "Ofelia Butler",
      "Isaiah Craig"
    ]
  };

  handleChange = event => {
    if (event.nativeEvent.text === "") {
      this.setState({ items: this.state.orgItems });
      return;
    }

    const arrayBeforeModify = this.state.orgItems;

    const newArray = arrayBeforeModify.filter(
      el =>
        el.toLowerCase().indexOf(event.nativeEvent.text.toLowerCase()) !== -1
    );

    this.setState({ items: newArray });
  };

  componentDidMount() {
    this.setState({ items: this.state.orgItems });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardListener
          onDidHide={() => {
            this.setState({ searchBarFocused: false });
          }}
          onDidShow={() => {
            this.setState({ searchBarFocused: true });
          }}
        />
        <View
          style={{
            height: 80,
            backgroundColor: "#c45653",
            justifyContent: "center",
            paddingHorizontal: 5
          }}
        >
          <Animatable.View
            animation="slideInRight"
            duration={500}
            style={{
              height: 50,
              backgroundColor: "white",
              flexDirection: "row",
              padding: 5,
              alignItems: "center"
            }}
          >
            <Animatable.View
              animation={
                this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"
              }
              duration={400}
            >
              <Icon
                name={
                  this.state.searchBarFocused ? "md-arrow-back" : "ios-search"
                }
                style={{ fontSize: 24 }}
              />
            </Animatable.View>
            <TextInput
              placeholder="Search"
              style={{ fontSize: 24, marginLeft: 15, flex: 1 }}
              onChange={this.handleChange}
            />
          </Animatable.View>
        </View>

        {this.state.items.length > 0 ? (
          <FlatList
            style={{
              backgroundColor: this.state.searchBarFocused
                ? "rgba(0,0,0,0.3)"
                : "white"
            }}
            data={this.state.items}
            renderItem={({ item }) => (
              <Text style={{ padding: 20, fontSize: 20 }}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.noItems}>
            <Text style={styles.noItemsText}>No Items found!</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    height: 80,
    backgroundColor: "#c45653",
    justifyContent: "center",
    paddingHorizontal: 5
  },
  animatableView: {
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
    alignItems: "center"
  },
  listItemTextStyle: {
    padding: 20,
    fontSize: 20
  },
  noItems: {
    flex: 1,
    alignItems: "center"
  },
  noItemsText: {
    fontSize: 20,
    color: "gray"
  }
});
