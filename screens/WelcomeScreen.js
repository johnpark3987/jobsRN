import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  {
    text: "Welcome to JobApp",
    color: "#03A9F4"
  },
  {
    text: "Job Finder will help you find a job",
    color: "#009688"
  },
  {
    text: "Set your location, then swipe away",
    color: "#03A9F4"
  }
];

export default class WelcomeScreen extends Component {
  // static navigationOptions = {
  //
  // }

  onSlidesComplete = () => {
    console.log(this.props.navigation)
    // console.log(this.props.navigation.navigate)
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <View>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}
