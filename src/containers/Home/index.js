'use strict'

import React from 'react'
import { View, Text } from 'react-native'
import { Spinner, Button, Title } from 'native-base'
import { connect } from 'react-redux'

import { facebookConnectionSuccess, facebookConnectionFailure, goToMatchFriendshipScene, goToMatchRelationshipScene } from './../../actions'

import Container from './../../components/Container'
import FacebookButton from './../../components/FacebookButton'

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

@connect(
  state => ({
    app : state.app,
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
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
      return (
        <Container header={true} scene='home'>
          <View style={styles.container}>
            <Button info style={[styles.button, styles.shadowed]} onPress={goToMatchFriendshipScene}><Title style={[styles.subtitle, styles.buttonText]}>Friendship</Title></Button>
            <Button info style={[styles.button, styles.shadowed]} onPress={goToMatchRelationshipScene}><Title style={[styles.subtitle, styles.buttonText]}>Relationship</Title></Button>
          </View>
        </Container>
      )
    } else {
      return (
        <Container header={false} cover={{type: 'splash', data:{subtype: 'login', gender:user.getIn(['profile', 'gender']), orientation:user.getIn(['profile', 'orientation'])}}}>
          <Title style={[styles.title, styles.shadowed]}>Plush!</Title>
          <Title style={[styles.subtitle, styles.shadowed]}>{this._getGreeting(user.getIn(['profile', 'gender']))}</Title>
          <Spinner style={styles.shadowed} color='white' />
        </Container>
      )
    }
  }
}