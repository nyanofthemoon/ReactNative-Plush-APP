'use strict'

import React from 'react'
import { View } from 'react-native'
import { Button } from 'native-base'

import styles from './styles'

export default class extends React.Component {

  render() {
    if (true === this.props.active) {
      return (
        <View style={styles.container}>
          <Button block danger style={styles.hangupButton} onPress={this.props.hangup}>Hang Up</Button>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Button danger style={styles.logoutButton} onPress={this.props.reject}>Decline</Button>
          <Button success style={styles.saveButton} onPress={this.props.accept}>Accept</Button>
        </View>
      )
    }
  }
}