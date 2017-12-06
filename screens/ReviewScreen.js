import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, ScrollView, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => {
        // return <Icon name='my-location' size={30} color={tintColor} />
    },
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('setting')}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        jobtitle, jobkey, company,
        formattedRelativeTime, url,
        longitude, latitude
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card
          key={jobkey}
          title={jobtitle}
        >
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      )
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
const mapStateToProps = (state) => {
  return { likedJobs: state.likedJobs }
}

export default connect(mapStateToProps)(ReviewScreen);
