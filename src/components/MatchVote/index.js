'use strict'

import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    handlePositiveVote: React.PropTypes.func.isRequired,
    handleNegativeVote: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Continue Meetup?</Text>
        <Button block style={styles.buttonContainer}><Button success large style={styles.button} onPress={this.props.handlePositiveVote}>Yes</Button></Button>
        <Button block style={styles.buttonContainer}><Button danger large style={styles.button} onPress={this.props.handleNegativeVote}>No</Button></Button>
      </View>
    )
  }
}