import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

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

class WelcomeScreen extends Component {
  componentWillMount() {
    this.props.checkForToken();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.hasToken) {
      this.props.navigation.navigate('map');
    } else {
      this.setState({ hasToken: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  welcomeScreenRenderer = () => {
    if(this.state == null) {
      return <AppLoading />
    }
    if(!this.state.hasToken) {
      return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    }
  }

  render() {
    return (
      <View>
        {this.welcomeScreenRenderer()}
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { hasToken: auth.hasToken };
}

export default connect(mapStateToProps, actions)(WelcomeScreen);
