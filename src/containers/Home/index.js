'use strict'

import React from 'react'
import { View, Text } from 'react-native'
import { Spinner, Button, Title } from 'native-base'
import { connect } from 'react-redux'

import { facebookConnectionSuccess, facebookConnectionFailure, goToFriendsScene, goToProfileScene, goToVideoScene, goToLogoutScene } from './../../actions'

import Container from './../../components/Container'
import FacebookButton from './../../components/FacebookButton'

import renderIf from './../../helpers/renderIf'

import styles from './styles'

@connect(
  state => ({
    app : state.app
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired
  }

  render() {
    const {app} = this.props
    if ('authenticated' !== app.get('facebookStatus')) {
      return (
        <Container header={false} footer={false} cover={'splash'}>
          <Title style={styles.title}>Extreme Meetups</Title>
          <FacebookButton handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} />
        </Container>
      )
    } else if ('connected' === app.get('apiStatus')) {
        return (
          <Container header={true} footer={true}>
            <Button success onPress={goToFriendsScene}>Friends</Button>
            <Button success onPress={goToProfileScene}>Profile</Button>
            <Button success onPress={goToVideoScene}>Ready!</Button>
            <Button warning onPress={goToLogoutScene}>Logout...</Button>
          </Container>
        )
    } else {
      return (
        <Container header={false} footer={false} cover={'splash'}>
          <Spinner color='blue'/>
        </Container>
      )
    }
  }
}