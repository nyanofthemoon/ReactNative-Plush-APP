'use strict'

import React from 'react'
import { AppState, View, Text } from 'react-native'

import { handleAppStateChange, handleAppMemoryWarning } from './../../actions'

import StatusBarBackground from './../StatusBarBackground'

import styles from './styles'

export default class extends React.Component {

  componentDidMount() {
    AppState.addEventListener('change', handleAppStateChange)
    AppState.addEventListener('memoryWarning', handleAppMemoryWarning)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', handleAppStateChange)
    AppState.removeEventListener('memoryWarning', handleAppMemoryWarning)
  }

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