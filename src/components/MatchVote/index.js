'use strict'

import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from 'native-base'

import * as Animatable from 'react-native-animatable'

import emoticons from './../../helpers/images/emoticons'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    handleVote: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      animations: {
        negativeOne  : null,
        negativeTwo  : null,
        negativeThree: null,
        neutral      : 'pulse',
        positiveOne  : null,
        positiveTwo  : null,
        positiveThree: null
      }
    }
  }

  _handlePress(key, feeling) {
    let animations = this.state.animations
    Object.keys(animations).forEach(function(key) {
      animations[key] = null
    })
    animations[key] = 'pulse'
    this.props.handleVote(this.props.step, feeling)
    this.setState({ animations: animations })
  }

  render() {
    return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Button onPress={this._handlePress.bind(this, 'negativeOne', 'bored')} style={styles.button}><Animatable.Image source={emoticons.left.bored} animation={this.state.animations.negativeOne} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
        <Button onPress={this._handlePress.bind(this, 'negativeTwo', 'offended')} style={styles.button}><Animatable.Image source={emoticons.left.offended} animation={this.state.animations.negativeTwo} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
        <Button onPress={this._handlePress.bind(this, 'negativeThree', 'angry')} style={styles.button}><Animatable.Image source={emoticons.left.angry} animation={this.state.animations.negativeThree} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
      </View>
      <View style={styles.subcontainer}>
        <Button onPress={this._handlePress.bind(this, 'neutral', 'undecided')} style={styles.button}><Animatable.Image source={emoticons.left.undecided} animation={this.state.animations.neutral} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
      </View>
      <View style={styles.subcontainer}>
        { 'relationship' === this.props.type ?
          (
            <Button onPress={this._handlePress.bind(this, 'positiveOne', 'charmed')} style={styles.button}><Animatable.Image source={emoticons.left.charmed} animation={this.state.animations.positiveOne} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
          ) : (
            <Button onPress={this._handlePress.bind(this, 'positiveOne', 'inspired')} style={styles.button}><Animatable.Image source={emoticons.left.inspired} animation={this.state.animations.positiveOne} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
          )
        }
        <Button onPress={this._handlePress.bind(this, 'positiveTwo', 'entertained')} style={styles.button}><Animatable.Image source={emoticons.left.entertained} animation={this.state.animations.positiveTwo} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
        <Button onPress={this._handlePress.bind(this, 'positiveThree', 'excited')} style={styles.button}><Animatable.Image source={emoticons.left.excited} animation={this.state.animations.positiveThree} style={styles.icon} duration={1000} iterationCount='infinite' /></Button>
      </View>
    </View>
    )
  }
}