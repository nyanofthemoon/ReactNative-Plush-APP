'use strict'

import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>[ User Statistics Component ]</Text>
      </View>
    )
  }
}