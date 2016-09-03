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
      'Report Request Confirmation',
      'Are you sure you wish to REPORT this user? A mutual block will be put in place and you will mutually be removed from your respective contact list.',
      [
        { text: 'No' },
        { text: 'YES!', onPress: () => this._reportUser() }
      ]
    )
  }

  _reportUser() {
    reportUser(this.props.id)
    let that = this
    setTimeout(function() {
      Alert.alert(
        'Report Request Processed',
        'You have reported this member and can no longer communicate with eachother.'
      )
      if (that.props.redirect) {
        that.props.redirect()
      }
    }, 750)
  }

  _confirmBlockUser() {
    Alert.alert(
      'Block Request Confirmation',
      'Are you sure you wish to BLOCK this user? A mutual block will be put in place and you will mutually be removed from your respective contact list.',
      [
        { text: 'No' },
        { text: 'YES!', onPress: () => this._blockUser() }
      ]
    )
  }

  _blockUser() {
    blockUser(this.props.id)
    let that = this
    setTimeout(function() {
      Alert.alert(
        'Block Request Processed',
        'You have blocked this member and can no longer communicate with eachother.'
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