'use strict'

import React from 'react'
import { Text, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Column as Col, Row } from 'react-native-flexbox-grid'

import { subscribeToMatchNotifications, unsubscribeFromMatchNotifications } from './../../helpers/socket'

import emoticons from './../../helpers/images/emoticons'
import { genderIcon } from './../../helpers/icons'

import styles from './styles'

export default class extends React.Component {

  componentWillMount() {
    subscribeToMatchNotifications()
  }

  componentWillUnmount() {
    unsubscribeFromMatchNotifications()
  }

  render() {
    return (
      <Animatable.View style={styles.container} animation='fadeInUp' duration={1000} iterationCount={1}>
        <Col sm={6}>
          <Text style={styles.text}>Last Plush</Text>
        </Col>
        <Col sm={1}>
          {genderIcon(this.props.data.get('leftGender'), {marginRight:10})}
        </Col>
        <Col sm={2}>
          <Image style={styles.icon} source={emoticons.left[this.props.data.get('leftEmoticon')]} />
        </Col>
        <Col sm={2}>
          <Image style={[styles.icon, {marginLeft: 15}]} source={emoticons.right[this.props.data.get('rightEmoticon')]} />
        </Col>
        <Col sm={1}>
          {genderIcon(this.props.data.get('rightGender'), {marginLeft:10})}
        </Col>
      </Animatable.View>
    )
  }
}