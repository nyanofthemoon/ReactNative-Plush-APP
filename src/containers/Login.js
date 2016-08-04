'use strict'

import React, { Component } from 'react';
import { Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {facebookConnectionSuccess, facebookConnectionFailure, facebookLogout} from './../actions'
import StatusBarBackground from './../components/StatusBarBackground'
import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import ListViewContainer from './../components/ListViewContainer'
import Login from './../components/Login'

import Icon from 'react-native-vector-icons/FontAwesome';

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
        <Icon name="rocket" size={75} color="#FFF" />
        <TextContainer>{facebookMessage}</TextContainer>
        <TextContainer>{websocketMessage}</TextContainer>
        <Login handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} handleLogout={facebookLogout} />
        <ListViewContainer data={[ {firstName: 'John'}, {firstName: 'Jane'} ]}></ListViewContainer>
      </ViewContainer>
    )
  }
}