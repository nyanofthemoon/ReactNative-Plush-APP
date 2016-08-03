import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import {facebookConnectionSuccess, facebookConnectionFailure, facebookLogout} from './../actions';
import Login from './../components/Login';

@connect(
  state => ({
    app:  state.app,
    user: state.user
  })
)

export default class extends Component {
  static propTypes = {
    app:      PropTypes.object.isRequired,
    user:     PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  };

  render() {
    const {app} = this.props
    switch(app.get('facebookStatus')) {
      case 'authenticated':
        switch(app.get('socketStatus')) {
          case 'connected':
            return (
              <View style={styles.container}>
                <Text>Facebook Authenticated</Text>
                <Text>Socket Connected</Text>
              </View>
            );
          case 'connecting':
            return (
              <View style={styles.container}>
                <Text>Facebook Authenticated</Text>
                <Text>Waiting for socket...</Text>
              </View>
            );
          default:
            return (
              <View style={styles.container}>
                <Text>Facebook Authenticated</Text>
                <Text>Websocket disconnected</Text>
              </View>
            );
        }
      case 'authenticating':
        return (
          <View style={styles.container}>
            <Text>Waiting for Facebook...</Text>
            <Login handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} handleLogout={facebookLogout} />
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <Text>
              Please Login with Facebook
            </Text>
            <Login handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} handleLogout={facebookLogout} />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: '#EEEEEE'
  }
});