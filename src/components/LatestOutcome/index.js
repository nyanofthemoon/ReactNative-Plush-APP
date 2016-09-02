'use strict'

import React from 'react'
import { Text, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { subscribeToMatchNotifications, unsubscribeFromMatchNotifications } from './../../helpers/socket'

import emoticons from './../../helpers/images/emoticons'
import { genderIcon } from './../../helpers/icons'

import styles from './styles'

export default class extends React.Component {

  /*
  constructor(props) {
    super(props)
    this.state = {
      anim: 'fadeInUp'
    }
  }
  */

  componentWillMount() {
    subscribeToMatchNotifications()
  }

  componentWillUnmount() {
    /*
    this.setState({
      anim: 'fadeOutDown'
    })
    */
    unsubscribeFromMatchNotifications()
  }

  render() {
    return (
      <Animatable.View style={styles.container} animation='fadeInUp' duration={1000} iterationCount={1}>
        <Text style={styles.text}>Last Match</Text>
        <View style={styles.itemLeft}>
          {genderIcon(this.props.data.get('leftGender'), styles.leftGender)}
          <Image style={styles.icon} source={emoticons.left[this.props.data.get('leftEmoticon')]} />
        </View>
        <View style={styles.itemRight}>
          <Image style={styles.icon} source={emoticons.right[this.props.data.get('rightEmoticon')]} />
          {genderIcon(this.props.data.get('rightGender'), styles.rightGender)}
        </View>
      </Animatable.View>
    )
  }
}