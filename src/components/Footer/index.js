'use strict'

// @NOTE Will contain a bottom ad. TBD.

import React from 'react'
import { View } from 'react-native'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}