'use strict'

import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Latest Outcome Notification Footer</Text>
      </View>
    )
  }
}