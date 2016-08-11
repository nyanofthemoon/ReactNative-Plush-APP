'use strict'

import React from 'react'
import { View, Text } from 'react-native'

import Button from './../Button'

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
        <Button onPress={this.props.handlePositiveVote} text={'Yes'} />
        <Button onPress={this.props.handleNegativeVote} text={'No'} />
      </View>
    )
  }
}