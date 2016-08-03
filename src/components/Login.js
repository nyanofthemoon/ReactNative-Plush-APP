// https://github.com/facebook/react-native-fbsdk
// https://developers.facebook.com/docs/facebook-login/permissions#reference-email

import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const { LoginButton } = FBSDK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error || result.isCancelled) {
              this.props.handleFailure();
            } else {
              this.props.handleSuccess();
            }
          }}
          onLogoutFinished={this.props.handleLogout}
          readPermissions={['public_profile', 'email']}
        >
        </LoginButton>
      </View>
    );
  }
};