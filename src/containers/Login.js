// https://github.com/facebook/react-native-fbsdk
// https://developers.facebook.com/docs/facebook-login/permissions#reference-email

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Login extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(function(data) {
              //alert(JSON.stringify(data));
              //alert(data.accessToken.toString())
              // Create a graph request asking for user information with a callback to handle the response.
              const infoRequest = new GraphRequest(
                '/me?fields=email,gender,first_name,last_name,link,picture,locale,timezone',
                null,
                function(error, result) {
                  if (error) {
                    alert("graph has error: " + err);
                  } else {
                    alert(JSON.stringify(result))
                  }
                }
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
              });
            }
          }}
          onLogoutFinished={() => alert("logout.")}
          readPermissions={['public_profile', 'email']}
        >
        </LoginButton>
      </View>
    );
  }
};


//fetchProfileRequest.addStringParameter('picture,email,gender','fields');