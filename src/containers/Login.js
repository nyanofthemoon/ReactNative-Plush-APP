'use strict'

import React from 'react'
import { Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {facebookConnectionSuccess, facebookConnectionFailure, facebookLogout} from './../actions'
import StatusBarBackground from './../components/StatusBarBackground'
import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
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
    switch(app.get('facebookStatus')) {
      case 'authenticated':
        switch(app.get('socketStatus')) {
          case 'connected':
            return (
              <ViewContainer>
                <StatusBarBackground/>
                <TextContainer>Facebook Authenticated</TextContainer>
                <TextContainer>Socket Connected</TextContainer>
              </ViewContainer>
            )
          case 'connecting':
            return (
              <ViewContainer>
                <StatusBarBackground/>
                <TextContainer>Facebook Authenticated</TextContainer>
                <TextContainer>Waiting for socket...</TextContainer>
              </ViewContainer>
            )
          default:
            return (
              <ViewContainer>
                <StatusBarBackground/>
                <TextContainer>Facebook Authenticated</TextContainer>
                <TextContainer>Websocket disconnected</TextContainer>
              </ViewContainer>
            )
        }
      case 'authenticating':
        return (
          <ViewContainer>
            <StatusBarBackground/>
            <TextContainer>Waiting for Facebook...</TextContainer>
            <Login handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} handleLogout={facebookLogout} />
          </ViewContainer>
        )
      default:
        return (
          <ViewContainer>
            <StatusBarBackground/>
            <TextContainer>Please Login with Facebook</TextContainer>
            <Login handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} handleLogout={facebookLogout} />
          </ViewContainer>
        )
    }
  }
}