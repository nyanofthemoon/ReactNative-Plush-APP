'use strict'

import React, { Component } from 'react';
import { Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { facebookConnectionSuccess, facebookConnectionFailure } from './../actions'
import StatusBarBackground from './../components/StatusBarBackground'
import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import FacebookButton from './../components/FacebookButton'

@connect(
  state => ({
    app : state.app,
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    app     : React.PropTypes.object.isRequired,
    user    : React.PropTypes.object.isRequired
  }

  render() {
    const {app, user} = this.props

    let facebookMessage;
    if ('authenticated' === app.get('facebookStatus')) {
      facebookMessage = 'FaceBook Authenticated'
    } else {
      facebookMessage = 'FaceBook Unauthenticated'
    }
    let websocketMessage;
    if ('connected' === app.get('socketStatus')) {
      websocketMessage = 'Websocket Connected'
    } else {
      websocketMessage = 'Websocket Disconnected'
    }

    return (
      <ViewContainer>
        <StatusBarBackground/>
        <TextContainer>{facebookMessage}</TextContainer>
        <TextContainer>{websocketMessage}</TextContainer>
        <FacebookButton handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} />
      </ViewContainer>
    )
  }
}