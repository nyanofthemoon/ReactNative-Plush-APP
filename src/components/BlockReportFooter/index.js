'use strict'

import React from 'react'
import { Alert, Text, View } from 'react-native'
import { Button } from 'native-base'

import { reportUser, blockUser } from './../../actions'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired
  }

  _confirmReportUser() {
    Alert.alert(
      'Report Confirmation',
      'Are you sure you wish to REPORT ABUSIVE BEHAVIOR from this person to the community? This person will also be BLOCKED permanently.',
      [
        { text: 'No...' },
        { text: 'YES!', onPress: () => this._reportUser() }
      ]
    )
  }

  _reportUser() {
    reportUser(this.props.id)
    let that = this
    setTimeout(function() {
      Alert.alert(
        'Report Confirmed',
        'You have reported this person to the community and a BLOCK has been put in place so that you can no longer communicate with each other.'
      )
      if (that.props.redirect) {
        that.props.redirect()
      }
    }, 750)
  }

  _confirmBlockUser() {
    Alert.alert(
      'Block Confirmation',
      'Are you sure you wish to BLOCK this person permanently?',
      [
        { text: 'No...' },
        { text: 'YES!', onPress: () => this._blockUser() }
      ]
    )
  }

  _blockUser() {
    blockUser(this.props.id)
    let that = this
    setTimeout(function() {
      Alert.alert(
        'Block Confirmed',
        'You have blocked this person and you can no longer communicate with each other.'
      )
      if (that.props.redirect) {
        that.props.redirect()
      }
    }, 750)
  }

  render() {
    if (!this.props.hideBlockButton) {
      return (
        <View style={styles.container}>
          <Button danger style={styles.reportButton} onPress={this._confirmReportUser.bind(this)}>Report</Button>
          <Button warning style={styles.blockButton} onPress={this._confirmBlockUser.bind(this)}>Block</Button>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Button danger style={styles.blockButton} onPress={this._confirmReportUser.bind(this)}>Report</Button>
        </View>
      )
    }
  }
}