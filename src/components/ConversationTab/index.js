'use strict'

import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

export default class extends React.Component {

  render() {
    return (
      <View>
        <Text>{this.props.profile.nickname}</Text>
        <Text>{JSON.stringify(this.props.data)}</Text>
      </View>
    )
  }

}