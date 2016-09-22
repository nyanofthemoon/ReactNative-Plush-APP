'use strict'

import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { Button, Title } from 'native-base'
import { connect } from 'react-redux'

const FBSDK = require('react-native-fbsdk');
const { ShareDialog } = FBSDK;

var Spinner = require('react-native-spinkit')

import { facebookConnectionSuccess, facebookConnectionFailure, goToMatchFriendshipScene, goToMatchRelationshipScene, calculateUnreadMessages } from './../../actions'

import Container from './../../components/Container'
import FacebookButton from './../../components/FacebookButton'

import halfcovers from './../../helpers/images/halfcovers'

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
    contact: state.contact
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
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

  _getHalfCover(type, gender, orientation) {
    return halfcovers[type][(gender+orientation)][Math.floor(Math.random()*halfcovers[type][(gender+orientation)].length)]
  }

  render() {
    const {app, user} = this.props
    if ('unauthenticated' === app.get('facebookStatus')) {
      return (
        <Container header={false} cover={{type: 'splash', data:{subtype: 'login', gender:user.getIn(['profile', 'gender']), orientation:user.getIn(['profile', 'orientation'])}}}>
          <Title style={[styles.title, styles.shadowed, { marginBottom: 65 }]}>Plush!</Title>
          <Title style={[styles.subtitle, styles.shadowed]}></Title>
          <FacebookButton handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} />
        </Container>
      )
    } else if ('connected' === app.get('apiStatus')) {
      let friendship   = this._getHalfCover('friendship', user.getIn(['profile','gender']), user.getIn(['profile', 'friendship']))
      let relationship = this._getHalfCover('relationship', user.getIn(['profile','gender']), user.getIn(['profile', 'orientation']))
      return (
        <Container header={true} unread={calculateUnreadMessages()} scene='home' headerTitle={'Start Plush!'}>
          <View style={styles.container}>
            <TouchableHighlight underlayColor='transparent' style={{flex: 1, borderTopWidth: 1, borderTopColor: 'white', borderBottomWidth: 1, borderBottomStyle: 'dashed', borderBottomColor: 'white'}} onPress={goToMatchFriendshipScene}>
              <Image source={friendship} style={styles.cover}>
                <Title style={[styles.coverText, styles.shadowed]}>Friendship</Title>
              </Image>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='transparent' style={{flex: 1 }} onPress={goToMatchRelationshipScene}>
              <Image source={relationship} style={styles.cover}>
                <Title style={[styles.coverText, styles.shadowed]}>Relationship</Title>
              </Image>
            </TouchableHighlight>
            <Button block info onPress={this._shareLinkWithDialog.bind(this)}>Share Plush! On Facebook</Button>
          </View>
        </Container>
      )
    } else {
      return (
        <Container header={false} cover={{type: 'splash', data:{subtype: 'login', gender:user.getIn(['profile', 'gender']), orientation:user.getIn(['profile', 'orientation'])}}}>
          <Title style={[styles.title, styles.shadowed]}>Plush!</Title>
          <Title style={[styles.subtitle, styles.shadowed]}>{this._getGreeting(user.getIn(['profile', 'gender']))}</Title>
          <Spinner size={50} type={this._getLoadingAnimation()} style={[styles.shadowed]} color='#FFFFFF'/>
        </Container>
      )
    }
  }
}