'use strict'

import React from 'react'
import { View, Text } from 'react-native'

import StatusBarBackground from './../StatusBarBackground'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBarBackground />
        { this.props.showLogo ?
          (
            <Text>[ Logo ]</Text>
          ) : (
            null
          )
        }
      </View>
    )
  }
}