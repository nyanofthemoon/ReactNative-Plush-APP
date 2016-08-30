'use strict'

import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from 'native-base'

import * as Animatable from 'react-native-animatable'

import {getSocketId}  from './../../helpers/socket'

import emoticons from './../../helpers/images/emoticons'
import results from './../../helpers/images/results'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    step   : React.PropTypes.string.isRequired,
    results: React.PropTypes.object.isRequired,
    scores : React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      left : 'undecided',
      right: 'undecided',
      match: false
    }
  }

  componentWillMount() {
    let result = this.state
    let socketId = '/#' + getSocketId()
    let that = this
    Object.keys(this.props.results[this.props.step]).map(function(key) {
      if (key === socketId) {
        result.left  = that.props.results[that.props.step][key]
      } else {
        result.right = that.props.results[that.props.step][key]
      }
    })
    if (this.props.scores[this.props.step] >= 1) {
      result.match = true
    }
    this.setState(result)
  }

  render() {
    return (
    <View style={styles.container}>
      <Animatable.Image source={emoticons.left[this.state.left]} animation='bounce' style={styles.icon} duration={1000} iterationCount={1} />
      <Animatable.Image source={emoticons.right[this.state.right]} animation='lightSpeedIn' style={styles.icon} duration={1000} iterationCount={1} delay={1500} />
      { true === this.state.match ?
        (
          <Animatable.Image source={results.positive} animation='zoomInDown' style={styles.largeicon} duration={1000} iterationCount={1} delay={2500} />
        ) : (
          <Animatable.Image source={results.negative} animation='zoomInDown' style={styles.largeicon} duration={1000} iterationCount={1} delay={2500} />
        )
      }
    </View>
    )
  }
}