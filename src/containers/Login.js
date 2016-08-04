'use strict'

import React from 'react'
import { Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {facebookConnectionSuccess, facebookConnectionFailure, facebookLogout} from './../actions'
import StatusBarBackground from './../components/StatusBarBackground'
import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import ListViewContainer from './../components/ListViewContainer'
import Login from './../components/Login'

@connect(
  state => ({
    app : state.app,
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    app     : React.PropTypes.object.isRequired,
    user    : React.PropTypes.object.isRequired,
    navigate: React.PropTypes.func.isRequired
  }

  render() {
    const {app, user} = this.props

    let facebookMessage;
    if ('authenticated' === app.get('facebookStatus')) {
      facebookMessage = 'FaceBook Unauthenticated'
    } else {
      facebookMessage = 'FaceBook Authenticated'
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
        <ListViewContainer data={[ {firstName: 'John'}, {firstName: 'Jane'} ]}></ListViewContainer>
      </ViewContainer>
    )
  }
}