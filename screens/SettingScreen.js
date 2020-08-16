import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          title="Review jobs"
          onPress={() => navigation.navigate('review')}
          buttonStyle={{
              backgroundColor: 'rgba(0,0,0,0)'
          }}
          titleStyle={{ color: 'rgba(0, 122, 255, 1)' }}
        />
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    };
  }

  render() {
    return (
      <View>
      <Button
        title="Reset Liked Jobs"
        large
        icon={{ name: 'delete-forever' }}
        buttonStyle={{
            backgroundColor: "#F44336"
        }}
        onPress={this.props.clearLikedJobs}
      />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(SettingScreen);
