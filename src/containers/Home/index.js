'use strict'

import React from 'react'
import { View, Text, Image, TouchableHighlight, StyleSheet, WebView } from 'react-native'
import { Button, Title } from 'native-base'
import { connect } from 'react-redux'

const FBSDK = require('react-native-fbsdk');
const { ShareDialog } = FBSDK;

var Spinner = require('react-native-spinkit')
import * as Animatable from 'react-native-animatable'

import { facebookConnectionSuccess, facebookConnectionFailure, goToMatchFriendshipScene, goToMatchRelationshipScene, calculateUnreadMessages, goToRegisterScene } from './../../actions'

import Container from './../../components/Container'
import FacebookButton from './../../components/FacebookButton'
import EventTimer from './../../components/EventTimer'

import styles from './styles'

const unisexGreets = [
  "You are special.",
  "You are unique.",
  "You are fabulous."
]

const maleGreets = [
  "You are handsome.",
  "You are fabulous.",
  "You are worthy.",
  "You are important.",
  "You are wonderful.",
  "You are talented.",
  "You are brave.",
  "You are lovable.",
  "You are knowledgeable.",
  "You are inspiring.",
  "You are irreplaceable."
]

const femaleGreets = [
  "You are pretty.",
  "You are fabulous.",
  "You are worthy.",
  "You are important.",
  "You are wonderful.",
  "You are talented.",
  "You are brave.",
  "You are lovable.",
  "You are knowledgeable.",
  "You are inspiring.",
  "You are irreplaceable."
]

const loadingAnimations = [
  'CircleFlip',
  'Bounce',
  'Wave',
  'WanderingCubes',
  'Pulse',
  'ThreeBounce',
  'Circle',
  '9CubeGrid',
  'FadingCircle',
  'FadingCircleAlt'
]

@connect(
  state => ({
    app : state.app,
    user: state.user,
    event : state.event,
    contact: state.contact
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    event: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired
  }

  _getGreeting(gender) {
    if ('M' === gender) {
      return maleGreets[Math.floor((Math.random() * maleGreets.length))]
    } else if ('F' === gender) {
      return femaleGreets[Math.floor((Math.random() * femaleGreets.length))]
    } else {
      return unisexGreets[Math.floor((Math.random() * unisexGreets.length))]
    }
  }

  _getLoadingAnimation() {
    return loadingAnimations[Math.floor((Math.random() * loadingAnimations.length))]
  }

  _shareLinkWithDialog() {
    const shareLinkContent = {
      contentType       : 'link',
      contentUrl        : 'https://itunes.apple.com/us/app/plush!/id1155174037',
      contentDescription: 'Plush! A fun way of meeting new people online.'
    }
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) { return ShareDialog.show(shareLinkContent) }
      }
    ).then(
      function(result) {
        if (result.postId) {
          alert('Thank you for sharing Plush!')
        }
      },
      function(error) {
        alert('Plush! was not shared: ' + error)
      }
    )
  }

  render() {
    const {app, user, event} = this.props
    let cover={type: 'splash', data:{subtype: 'login', gender:user.getIn(['profile', 'gender']), orientation:user.getIn(['profile', 'orientation'])}}
    if ('unauthenticated' === app.get('facebookStatus') && 'unauthenticated' === app.get('plushStatus')) {
      return (
        <Container header={false} cover={cover}>
          <Title style={[styles.title, styles.shadowed, { marginBottom: 65 }]}>Plush!</Title>
          <Title style={[styles.subtitle, styles.shadowed]}>Dating From Your Mobile.</Title>
          <Animatable.View animation='pulse' iterationCount='infinite'><FacebookButton large={true} handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} /></Animatable.View>
          <TouchableHighlight style={styles.registerButton} onPress={goToRegisterScene}><Text style={styles.registerButtonText}>Log in with Plush! Account</Text></TouchableHighlight>
        </Container>
      )
    } else if ('connected' === app.get('apiStatus')) {
      let now        = new Date().getTime()
      let eventStart = event.get('start')
      let eventEnd   = event.get('end')
      let footer = null
      let title  = null
      if (now >= eventStart && now < eventEnd) {
        title  = 'Current Plush! Event'
        footer = <TouchableHighlight style={styles.eventButton} underlayColor={'#003200'} onPress={goToMatchRelationshipScene}><Text style={styles.eventButtonText}>Meet Someone Now !</Text></TouchableHighlight>
      } else {
        title = 'Next Plush! Event'
        footer = <TouchableHighlight style={styles.eventButtonDisabled}><Text style={styles.eventButtonText}>Waiting For Next Event</Text></TouchableHighlight>
      }
      return (
        <Container header={true} footer={footer} unread={calculateUnreadMessages()} scene='home' headerTitle={'Start Plush!'}>
          <View style={[styles.container, styles.centered]}>
            <Title style={[styles.subtitle, styles.shadowed]}>{title}</Title>
            <EventTimer start={eventStart} />
            <WebView style={styles.video}
                     scrollEnabled={false}
                     javaScriptEnabled={false} source={{uri: 'https://www.youtube.com/embed/HmZKgaHa3Fg?rel=0&autoplay=0&showinfo=0&controls=0'}}/>
          </View>
        </Container>
      )
    } else {
      return (
        <Container header={false} cover={cover}>
          <Title style={[styles.title, styles.shadowed]}>Plush!</Title>
          <Title style={[styles.subtitle, styles.shadowed]}>{this._getGreeting(user.getIn(['profile', 'gender']))}</Title>
          <Spinner size={50} type={this._getLoadingAnimation()} style={[styles.shadowed]} color='#FFFFFF'/>
        </Container>
      )
    }
  }
}