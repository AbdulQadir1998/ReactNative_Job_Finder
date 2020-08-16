import React, { Component } from 'react';
import { Text, View, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Review Jobs',
      headerTitle: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
          buttonStyle={{
              backgroundColor: 'rgba(0,0,0,0)'
          }}
          titleStyle={{
            color: 'rgba(0, 122, 255, 1)'
          }}
        />
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      },
      tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor}/>
    };
  }

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const initialRegion = {
        longitude: job.longitude,
        latitude: job.latitude,
        longitudeDelta: 0.045,
        latitudeDelta: 0.02
      };

      return (
        <Card title={job.jobtitle} key={job.jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android' ? true : false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              buttonStyle={{
                  backgroundColor: "#03A9F4"
              }}
              onPress={() => Linking.openURL(job.url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italic: {
    fontStyle: 'italics'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection :'row',
    justifyContent: 'space-around'
  }
};

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
