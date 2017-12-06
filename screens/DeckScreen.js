import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';

import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    // tabBarIcon: ({ tintColor }) => {
    //     return <Icon name='my-location' size={30} color={tintColor} />
    // }

  }

  state = {
    propsReady : false
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('this is next props');
    if(nextProps.jobs != null) {
      console.log(nextProps.jobs);
      console.log('setting state');
      this.setState({ propsReady: true });
    }
  }

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return(
      <Card
        title={job.jobtitle}
      >
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
        </Text>
      </Card>
    )
  }

  renderNoMoreCards = () => {
    return(
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    )
  }

  render() {
    if(this.state.propsReady == false) {
      console.log('it is false');
      return <View></View>
    } else {
      console.log(this.props.jobs);
      return (
        <View style={{ marginTop: 10 }}>
          <Swipe
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          data={this.props.jobs}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="jobkey"
          />

        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
})

const mapStateToProps = ({ jobs }) => {
  // must return a plain object
  console.log(jobs);
  console.log('this is jobs');
  return { jobs : jobs.results };
};

export default connect(mapStateToProps, actions)(DeckScreen)
