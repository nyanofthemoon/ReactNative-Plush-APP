'use strict'

import React from 'react'
import { Text } from 'react-native'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <Text style={styles.container}>
        {this.props.children}
      </Text>
    )
  }
}