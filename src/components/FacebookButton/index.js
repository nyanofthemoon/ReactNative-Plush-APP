// https://github.com/facebook/react-native-fbsdk
// https://developers.facebook.com/docs/facebook-login/permissions#reference-email

'use strict'

import React from 'react'
import { View } from 'react-native'

const FBSDK = require('react-native-fbsdk')
const { AccessToken, LoginButton } = FBSDK;

import styles from './styles'

export default class extends React.Component {

  componentWillMount() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
          this.props.handleSuccess()
        } else {
          this.props.handleFailure()
        }
      }
    )
  }

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
          onLogoutFinished={this.props.handleFailure}
          readPermissions={['public_profile', 'email', 'user_birthday']}
        >
        </LoginButton>
      </View>
    )
  }
}