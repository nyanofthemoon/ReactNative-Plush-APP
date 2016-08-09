'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux'

//import { facebookConnectionSuccess, facebookConnectionFailure, goToFriendsScene, goToProfileScene, goToVideoScene } from './../actions'

import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import RTCView from './../components/RTCView'

import Config from './../config'

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
  };

  constructor(props) {
    super(props)
    this.state = {
      status: 'waiting', // waiting || audio || selection_audio || results_audio || video || selection_video || results_video || completed
      timer : null  // Config.video.WAIT_TIME_AUDIO_CONVERSATION etc
    }
  }

  render() {
    const {app, user} = this.props



    return (
      <ViewContainer>
        <Header showLogo={false} />
        <TextContainer>Video Scene</TextContainer>
        <RTCView socket={app.get('socket')} config={Config.webrtc} />
        <Footer />
      </ViewContainer>
    )



  }
}