'use strict'

import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

export default class extends React.Component {

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.profile)}</Text>
      </View>
    )
  }
}