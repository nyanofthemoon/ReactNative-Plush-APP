'use strict'

import React from 'react'
import { View, Text } from 'react-native'
import { Spinner, Button } from 'native-base'
import { connect } from 'react-redux'

import { facebookConnectionSuccess, facebookConnectionFailure, facebookConnectionLogout, goToFriendsScene, goToProfileScene, goToVideoScene, logout } from './../actions'

import Container from './../components/Container'
import UserStatistics from './../components/UserStatistics'
import FacebookButton from './../components/FacebookButton'

import renderIf from './../helpers/renderIf'

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
          <FacebookButton handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} />
        </Container>
      )
    } else if ('connected' === app.get('apiStatus')) {
        return (
          <Container header={true} footer={true}>
            <Button success onPress={goToFriendsScene}>Friends</Button>
            <Button success onPress={goToProfileScene}>Profile</Button>
            <Button success onPress={goToVideoScene}>Ready!</Button>
          </Container>
        )
    } else {
      return (
        <Container header={false} footer={false} cover={'splash'}>
          <Spinner color='red' />
        </Container>
      )
    }
  }
}