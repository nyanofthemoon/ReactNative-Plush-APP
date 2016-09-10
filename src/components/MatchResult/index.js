'use strict'

import React from 'react'
import { View, Text, Image } from 'react-native'
import { Title, Button, Footer } from 'native-base'

import * as Animatable from 'react-native-animatable'

import { getSocketId } from './../../helpers/socket'
import { goToMatchFriendshipScene, goToMatchRelationshipScene, goToContact } from './../../actions'

import emoticons from './../../helpers/images/emoticons'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    step   : React.PropTypes.string.isRequired,
    type   : React.PropTypes.string.isRequired,
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

  isMatch() {
    return this.state.match
  }

  componentWillMount() {
    let result = this.state
    let socketId = '/#' + getSocketId()
    let that = this
    result.match = false
    Object.keys(this.props.results[this.props.step]).map(function(key) {
      if (key === socketId) {
        result.left  = that.props.results[that.props.step][key]
      } else {
        result.right = that.props.results[that.props.step][key]
      }
    })

    if ('audio' === this.props.step) {
      if (this.props.scores[this.props.step] >= 1) {
        result.match = true
      }
    } else {
      if (this.props.scores[this.props.step] >= 2) {
        result.match = true
      }
    }
    this.setState(result)
  }

  _goToProfile() {
    goToContact(this.props.currentSceneId)
  }

render() {
    let retryButton
    let profileButton
    if ('video' === this.props.step) {
      if ('relationship' === this.props.type) {
        retryButton = <Button style={styles.button} info onPress={goToMatchRelationshipScene}><Title style={styles.title}>Try Again!</Title></Button>
      } else {
        retryButton = <Button style={styles.button} info onPress={goToMatchFriendshipScene}><Title style={styles.title}>Try Again!</Title></Button>
      }
      profileButton = <Button style={styles.button} info onPress={this._goToProfile}><Title style={styles.title}>View Contact</Title></Button>
    }
    return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Animatable.Image source={emoticons.left[this.state.left]} animation='bounce' style={styles.icon} duration={1000} iterationCount={1} />
        <Animatable.Image source={emoticons.right[this.state.right]} animation='lightSpeedIn' style={styles.icon} duration={1000} iterationCount={1} delay={1500} />
      </View>
      { true === this.state.match ?
        (
          <View>
            <Title style={styles.title}>It's a Plush!</Title>
            <Animatable.View animation='zoomInDown' duration={1000} iterationCount={1} delay={2250}>
              {profileButton}
            </Animatable.View>
          </View>
        ) : (
          <View>
            <Title style={styles.title}>Aww... No Plush.</Title>
            <Animatable.View animation='zoomInDown' duration={1000} iterationCount={1} delay={2250}>
              {retryButton}
            </Animatable.View>
          </View>
        )
      }
    </View>
    )
  }
}