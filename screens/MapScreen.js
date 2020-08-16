import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Map',
      tabBarIcon: ({ tintColor }) => <Icon name="my-location" size={30} color={tintColor}/>
    };
  };

  state = {
    mapLoaded: false,
    phone: '',
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    console.log(region);
      this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region,this.state.phone,
        this.props.navigation.navigate('deck'));
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View>
          <Input
            style={styles.inputStyle}
            placeholder="Enter favorite Job"
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <MapView
          region={this.state.region}
          style={{flex: 1}}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search This Area"
            buttonStyle={{
                backgroundColor: '#009688'
            }}
            icon={{ name: 'search'}}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    marginTop: 10,
    left: 0,
    right: 0
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};

export default connect(null, actions)(MapScreen);
