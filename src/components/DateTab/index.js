'use strict'

import React from 'react'
import { Text, View } from 'react-native'

import ListView from './../ListView'

import styles from './styles'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    var data = [
      {id: 1, name: 'Date A'},
      {id: 2, name: 'Date B'},
    ]

    return (
      <View>
        <ListView data={data} />
      </View>
    )
  }
}