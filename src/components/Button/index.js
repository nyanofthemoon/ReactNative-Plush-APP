'use strict'

import React from 'react'
import { TouchableHighlight, Text, Image } from 'react-native'

import styles from './styles'

export default class extends React.Component {

  _onPress() {
    alert('Button Pressed!')
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.props.onPress || this._onPress }>
        { this.props.source ?
          (
            <Image
              style={this.props.style}
              source={require('./assets/' + this.props.source)}
            />
          ) : (
            <Text style={this.props.style}>
              {this.props.text}
            </Text>
          )
        }
      </TouchableHighlight>
    )
  }
}