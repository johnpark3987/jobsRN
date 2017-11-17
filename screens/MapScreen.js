import React, { Component } from 'react';
import { MapView } from 'expo';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'

import * as actions from '../actions';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }
  componentDidMount() {
    console.log(this.state);
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    console.log(region);
    if (this.state.mapLoaded) {
      console.log('setting new region');
      this.setState({ region });
    }
  }

  onButtonPress = () => {
    console.log('button pressed')
    this.props.fetchJobs(this.state.region);
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={styles.flexOne}>
        <MapView
          style={styles.flexOne}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this area"
            backgroundColor="#009688"
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10
  }
});

export default connect(null, actions)(MapScreen);
